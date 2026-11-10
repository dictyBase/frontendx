import fs from "node:fs"
import path from "node:path"
import { pipe } from "fp-ts/lib/function.js"
import {
  filter as Afilter,
  map as Amap,
  reduce as Areduce,
  sort as Asort,
  match as Amatch,
} from "fp-ts/lib/Array.js"
import { match as Bmatch } from "fp-ts/lib/boolean.js"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  flatMap as OflatMap,
  match as Omatch,
} from "fp-ts/lib/Option.js"
import { Ord as SOrd } from "fp-ts/lib/string.js"
import { contramap } from "fp-ts/lib/Ord.js"
import { match, P } from "ts-pattern"
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
} from "@playwright/test/reporter"

const DEFAULT_OUTPUT_FILE = "postflight-report.md"
const DEFAULT_TARGET_URL = "unknown"
const DEFAULT_ERROR_MESSAGE = "Test failed without an error message"
const MS_PER_SECOND = 1000
// eslint-disable-next-line no-control-regex
const ANSI_ESCAPE_REGEXP = /\u001B\[[\d;]*[A-Za-z]/g

type PostflightReporterOptions = {
  outputFile?: string
  baseURL?: string
  appName?: string
  configDir?: string
}

type SuiteMetrics = {
  suite: string
  total: number
  passed: number
  failed: number
  flaky: number
  skipped: number
  durationMs: number
}

type TestFailureItem = {
  suite: string
  title: string
  project: string
  errorMessage: string
}

type PostflightReportData = {
  appName?: string
  targetUrl: string
  status: FullResult["status"]
  total: number
  passed: number
  failed: number
  flaky: number
  skipped: number
  durationMs: number
  suites: Array<SuiteMetrics>
  failures: Array<TestFailureItem>
}

const bySuiteName = pipe(
  SOrd,
  contramap((item: SuiteMetrics) => item.suite),
)

const formatDuration = (durationMs: number): string =>
  pipe(
    durationMs < MS_PER_SECOND,
    Bmatch(
      () => `${(durationMs / MS_PER_SECOND).toFixed(1)}s`,
      () => `${Math.round(durationMs)}ms`,
    ),
  )

const stripAnsiAndCompact = (rawMessage: string): string =>
  pipe(
    rawMessage.replaceAll(ANSI_ESCAPE_REGEXP, "").split("\n"),
    Amap((line) => line.trim()),
    Afilter((line) => line.length > 0),
    Amatch(
      () => DEFAULT_ERROR_MESSAGE,
      ([firstLine]) => firstLine.replaceAll("`", "'").replaceAll("|", "\\|"),
    ),
  )

const resolveOverallStatus = (
  report: Pick<PostflightReportData, "passed" | "failed" | "status">,
): string =>
  match(report)
    .with({ failed: 0, status: "passed" }, () => "HEALTHY")
    .with({ passed: 0, failed: P.number.gt(0) }, () => "DOWN")
    .otherwise(() => "DEGRADED")

const resolveSuiteStatus = (failed: number): string =>
  pipe(
    failed === 0,
    Bmatch(
      () => "FAIL",
      () => "PASS",
    ),
  )

const getTestDuration = (testCase: TestCase): number =>
  pipe(
    testCase.results,
    Areduce(0, (total, attempt) => total + attempt.duration),
  )

const getSuiteFileName = (testCase: TestCase): string =>
  path.basename(testCase.location.file)

const getProjectName = (testCase: TestCase): string =>
  pipe(
    testCase.parent.project(),
    OfromNullable,
    Omap((project) => project.name),
    OgetOrElse(() => "default"),
  )

const getFailureMessage = (testCase: TestCase): string =>
  pipe(
    testCase.results,
    Afilter((attempt) => Boolean(attempt.error?.message)),
    Amatch(
      () => DEFAULT_ERROR_MESSAGE,
      (attemptsWithError) =>
        pipe(
          attemptsWithError.at(-1),
          OfromNullable,
          OflatMap((attempt) => OfromNullable(attempt.error?.message)),
          Omap(stripAnsiAndCompact),
          OgetOrElse(() => DEFAULT_ERROR_MESSAGE),
        ),
    ),
  )

const aggregateSuites = (tests: Array<TestCase>): Array<SuiteMetrics> => {
  const suiteMap = pipe(
    tests,
    Areduce(new Map<string, SuiteMetrics>(), (accumulator, testCase) => {
      const suiteName = getSuiteFileName(testCase)
      const outcome = testCase.outcome()
      const duration = getTestDuration(testCase)
      const existing = pipe(
        accumulator.get(suiteName),
        OfromNullable,
        OgetOrElse(
          (): SuiteMetrics => ({
            suite: suiteName,
            total: 0,
            passed: 0,
            failed: 0,
            flaky: 0,
            skipped: 0,
            durationMs: 0,
          }),
        ),
      )
      const updated: SuiteMetrics = {
        suite: suiteName,
        total: existing.total + 1,
        passed:
          existing.passed +
          pipe(
            outcome === "expected",
            Bmatch(
              () => 0,
              () => 1,
            ),
          ),
        failed:
          existing.failed +
          pipe(
            outcome === "unexpected",
            Bmatch(
              () => 0,
              () => 1,
            ),
          ),
        flaky:
          existing.flaky +
          pipe(
            outcome === "flaky",
            Bmatch(
              () => 0,
              () => 1,
            ),
          ),
        skipped:
          existing.skipped +
          pipe(
            outcome === "skipped",
            Bmatch(
              () => 0,
              () => 1,
            ),
          ),
        durationMs: existing.durationMs + duration,
      }
      accumulator.set(suiteName, updated)
      return accumulator
    }),
  )

  return pipe([...suiteMap.values()], Asort(bySuiteName))
}

const collectFailures = (tests: Array<TestCase>): Array<TestFailureItem> =>
  pipe(
    tests,
    Afilter((testCase) => testCase.outcome() === "unexpected"),
    Amap((testCase) => ({
      suite: getSuiteFileName(testCase),
      title: testCase.title,
      project: getProjectName(testCase),
      errorMessage: getFailureMessage(testCase),
    })),
  )

const buildReportData = (
  appName: string | undefined,
  targetUrl: string,
  tests: Array<TestCase>,
  result: FullResult,
): PostflightReportData => {
  const suites = aggregateSuites(tests)
  const failures = collectFailures(tests)
  const totals = pipe(
    suites,
    Areduce(
      { total: 0, passed: 0, failed: 0, flaky: 0, skipped: 0 },
      (accumulator, item) => ({
        total: accumulator.total + item.total,
        passed: accumulator.passed + item.passed,
        failed: accumulator.failed + item.failed,
        flaky: accumulator.flaky + item.flaky,
        skipped: accumulator.skipped + item.skipped,
      }),
    ),
  )

  return {
    appName,
    targetUrl,
    status: result.status,
    ...totals,
    durationMs: result.duration,
    suites,
    failures,
  }
}

const formatSuiteRow = (item: SuiteMetrics): string =>
  `| \`${item.suite}\` | ${item.passed}/${item.total} | ${item.failed} | ${
    item.flaky
  } | ${item.skipped} | ${formatDuration(
    item.durationMs,
  )} | **${resolveSuiteStatus(item.failed)}** |`

const formatFailureBullet = (failure: TestFailureItem): string =>
  `- **\`${failure.suite} > ${failure.title}\`** (\`${failure.project}\`): \`${failure.errorMessage}\``

const formatReportHeading = (appName?: string): string =>
  pipe(
    appName,
    OfromNullable,
    Omatch(
      () => "# Post-Flight E2E Report",
      (name) => `# Post-Flight E2E Report (${name})`,
    ),
  )

const buildPostflightMarkdown = (report: PostflightReportData): string => {
  const overallStatus = resolveOverallStatus(report)
  const summaryLines = [
    formatReportHeading(report.appName),
    "",
    "| Target URL | Status | Total | Passed | Failed | Flaky | Skipped | Duration |",
    "| :--- | :--- | ---: | ---: | ---: | ---: | ---: | ---: |",
    `| \`${report.targetUrl}\` | **${overallStatus}** | ${report.total} | ${
      report.passed
    } | ${report.failed} | ${report.flaky} | ${
      report.skipped
    } | ${formatDuration(report.durationMs)} |`,
  ]

  const suiteLines = [
    "",
    "## Suite Health",
    "",
    "| Suite | Passed | Failed | Flaky | Skipped | Duration | Status |",
    "| :--- | ---: | ---: | ---: | ---: | ---: | :--- |",
    ...pipe(report.suites, Amap(formatSuiteRow)),
  ]

  const failureBullets = pipe(
    report.failures,
    Amatch(
      () => ["- All post-flight E2E tests passed."],
      (items) => pipe(items, Amap(formatFailureBullet)),
    ),
  )

  const failureLines = ["", "## Failure Summary", "", ...failureBullets, ""]

  return [...summaryLines, ...suiteLines, ...failureLines].join("\n")
}

function createPostflightReporter(
  options: PostflightReporterOptions = {},
): Reporter {
  let rootSuite: Suite | undefined
  let resolvedTargetUrl = pipe(
    options.baseURL,
    OfromNullable,
    OgetOrElse(() => DEFAULT_TARGET_URL),
  )
  const resolvedAppName = pipe(
    options.appName,
    OfromNullable,
    Omatch(
      () =>
        pipe(
          options.configDir,
          OfromNullable,
          Omap((directory) => path.basename(directory)),
          OgetOrElse((): string | undefined => undefined),
        ),
      (name) => name,
    ),
  )

  const outputPath = pipe(
    options.outputFile,
    OfromNullable,
    OgetOrElse(() => DEFAULT_OUTPUT_FILE),
    (filePath) =>
      pipe(
        options.configDir,
        OfromNullable,
        Omap((configDirectory) => path.resolve(configDirectory, filePath)),
        OgetOrElse(() => path.resolve(filePath)),
      ),
  )

  return {
    printsToStdio: () => false,
    onBegin: (config: FullConfig, suite: Suite) => {
      rootSuite = suite
      resolvedTargetUrl = pipe(
        config.projects.at(0)?.use.baseURL,
        OfromNullable,
        OgetOrElse(() => resolvedTargetUrl),
      )
    },
    onEnd: (result: FullResult) => {
      const allTests = pipe(
        rootSuite,
        OfromNullable,
        Omap((suite) => suite.allTests()),
        OgetOrElse((): Array<TestCase> => []),
      )
      const reportData = buildReportData(
        resolvedAppName,
        resolvedTargetUrl,
        allTests,
        result,
      )
      const markdown = buildPostflightMarkdown(reportData)
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.appendFileSync(outputPath, `${markdown}\n`, "utf8")
    },
  }
}

export {
  formatDuration,
  stripAnsiAndCompact,
  resolveOverallStatus,
  resolveSuiteStatus,
  buildPostflightMarkdown,
  createPostflightReporter,
}
export type {
  PostflightReporterOptions,
  PostflightReportData,
  SuiteMetrics,
  TestFailureItem,
}
// eslint-disable-next-line import/no-default-export
export default createPostflightReporter
