import { test, expect } from "vitest"
import {
  formatDuration,
  stripAnsiAndCompact,
  resolveOverallStatus,
  resolveSuiteStatus,
  buildPostflightMarkdown,
  type PostflightReportData,
} from "../postflightReporter"

const STRAIN_SUITE = "strainPage.spec.ts"

const healthyReport: PostflightReportData = {
  appName: "stock-center",
  targetUrl: "https://dictybase.dev/stockcenter",
  status: "passed",
  total: 4,
  passed: 4,
  failed: 0,
  flaky: 0,
  skipped: 0,
  durationMs: 12_450,
  suites: [
    {
      suite: "catalog.spec.ts",
      total: 2,
      passed: 2,
      failed: 0,
      flaky: 0,
      skipped: 0,
      durationMs: 6200,
    },
    {
      suite: STRAIN_SUITE,
      total: 2,
      passed: 2,
      failed: 0,
      flaky: 0,
      skipped: 0,
      durationMs: 6250,
    },
  ],
  failures: [],
}

const degradedReport: PostflightReportData = {
  ...healthyReport,
  status: "failed",
  passed: 3,
  failed: 1,
  suites: [
    healthyReport.suites[0],
    {
      suite: STRAIN_SUITE,
      total: 2,
      passed: 1,
      failed: 1,
      flaky: 0,
      skipped: 0,
      durationMs: 6250,
    },
  ],
  failures: [
    {
      suite: STRAIN_SUITE,
      title: "Displays Strain Details",
      project: "firefox",
      errorMessage:
        "Timed out 30000ms waiting for expect(locator).toBeVisible()",
    },
  ],
}

test("formatDuration formats sub-second durations in milliseconds", () => {
  expect(formatDuration(450)).toBe("450ms")
})

test("formatDuration formats durations of one second or more in seconds", () => {
  expect(formatDuration(12_450)).toBe("12.4s")
})

test("stripAnsiAndCompact removes ANSI codes, keeps first line, and escapes markdown characters", () => {
  const raw =
    "\n  \u001B[31mError: expect(`locator`).toHaveURL(a | b)\u001B[39m\n    at line 42"
  expect(stripAnsiAndCompact(raw)).toBe(
    "Error: expect('locator').toHaveURL(a \\| b)",
  )
})

test("resolveOverallStatus returns HEALTHY when all tests pass", () => {
  expect(
    resolveOverallStatus({ passed: 10, failed: 0, status: "passed" }),
  ).toBe("HEALTHY")
})

test("resolveOverallStatus returns DOWN when all executed tests fail", () => {
  expect(resolveOverallStatus({ passed: 0, failed: 5, status: "failed" })).toBe(
    "DOWN",
  )
})

test("resolveOverallStatus returns DEGRADED when some tests pass and some fail", () => {
  expect(resolveOverallStatus({ passed: 8, failed: 2, status: "failed" })).toBe(
    "DEGRADED",
  )
})

test("resolveSuiteStatus returns PASS when failed count is zero and FAIL otherwise", () => {
  expect(resolveSuiteStatus(0)).toBe("PASS")
  expect(resolveSuiteStatus(2)).toBe("FAIL")
})

test("buildPostflightMarkdown renders summary table, suite health table, and healthy failure summary", () => {
  const markdown = buildPostflightMarkdown(healthyReport)

  expect(markdown).toContain("# Post-Flight E2E Report (stock-center)")
  expect(markdown).toContain(
    "| `https://dictybase.dev/stockcenter` | **HEALTHY** | 4 | 4 | 0 | 0 | 0 | 12.4s |",
  )
  expect(markdown).toContain(
    "| `catalog.spec.ts` | 2/2 | 0 | 0 | 0 | 6.2s | **PASS** |",
  )
  expect(markdown).toContain("- All post-flight E2E tests passed.")
})

test("buildPostflightMarkdown renders failure bullet items when tests fail", () => {
  const markdown = buildPostflightMarkdown(degradedReport)

  expect(markdown).toContain(
    "| `https://dictybase.dev/stockcenter` | **DEGRADED** | 4 | 3 | 1 | 0 | 0 | 12.4s |",
  )
  expect(markdown).toContain(
    "| `strainPage.spec.ts` | 1/2 | 1 | 0 | 0 | 6.3s | **FAIL** |",
  )
  expect(markdown).toContain(
    "- **`strainPage.spec.ts > Displays Strain Details`** (`firefox`): `Timed out 30000ms waiting for expect(locator).toBeVisible()`",
  )
})
