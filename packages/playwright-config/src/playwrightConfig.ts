import path from "node:path"
import { pipe } from "fp-ts/lib/function.js"
import { match as Bmatch } from "fp-ts/lib/boolean.js"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/lib/Option.js"
import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
  type ReporterDescription,
} from "@playwright/test"

const LOCALHOST_REGEXP = /^https?:\/\/localhost(?::\d{1,5})?(?:[#/?]\S*)?$/i
const REPORTER_PATH = "@dictybase/playwright-config/reporter"

const createPlaywrightConfig = (): PlaywrightTestConfig => {
  if (process.env.ENV_FILE) {
    process.loadEnvFile(process.env.ENV_FILE)
  }

  const baseURL = pipe(
    process.env.PLAYWRIGHT_BASE_URL,
    OfromNullable,
    OgetOrElse(() => ""),
  )
  const appName = path.basename(process.cwd())
  const isLocal = LOCALHOST_REGEXP.test(baseURL)
  const isCi = Boolean(process.env.CI)

  const consoleReporter: ReporterDescription = pipe(
    isCi,
    Bmatch(
      (): ReporterDescription => ["list"],
      (): ReporterDescription => ["github"],
    ),
  )

  const postflightReporters: Array<ReporterDescription> = pipe(
    isLocal,
    Bmatch(
      (): Array<ReporterDescription> => [
        [
          REPORTER_PATH,
          {
            outputFile: "../../postflight-report.md",
            baseURL,
            appName,
          },
        ],
      ],
      (): Array<ReporterDescription> => [],
    ),
  )

  return defineConfig({
    testDir: "./src/e2e",
    fullyParallel: true,
    forbidOnly: isCi,
    retries: pipe(
      isCi,
      Bmatch(
        () => 0,
        () => 2,
      ),
    ),
    workers: pipe(
      isCi,
      Bmatch(
        () => 4,
        () => 1,
      ),
    ),
    reporter: [consoleReporter, ...postflightReporters],
    timeout: 60_000,
    expect: {
      timeout: 30_000,
      toHaveScreenshot: { maxDiffPixelRatio: 0.05 },
    },
    projects: [
      {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
      },
      {
        name: "Microsoft Edge",
        use: { ...devices["Desktop Edge"], channel: "msedge" },
      },
      {
        name: "Google Chrome",
        use: { ...devices["Desktop Chrome"], channel: "chrome" },
      },
    ],
    webServer: pipe(
      isLocal,
      Bmatch(
        () => undefined,
        () => ({
          timeout: 120 * 1000,
          command: "yarn dev",
          url: baseURL,
          reuseExistingServer: !isCi,
        }),
      ),
    ),
    use: {
      baseURL,
      trace: "on-first-retry",
      timezoneId: "UTC",
    },
  })
}

export { createPlaywrightConfig }
