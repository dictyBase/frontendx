import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 */
process.loadEnvFile(process.env.ENV_FILE as string)

const baseURL = process.env.PLAYWRIGHT_BASE_URL as string
const localHostRegexp = /^https?:\/\/localhost(?::\d{1,5})?(?:[#/?]\S*)?$/i
const isLocal = localHostRegexp.test(baseURL)
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [process.env.CI ? "github" : "list"],
    ...(isLocal
      ? []
      : [
          [
            "./src/e2e/utils/postflightReporter.ts",
            {
              outputFile: "../../postflight-report.md",
              baseURL: `${baseURL}`,
            },
          ] as [string, { outputFile: string; baseURL: string }],
        ]),
  ],
  timeout: 60_000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: {
    timeout: 30_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.05 },
  },
  /* Configure projects for major browsers */
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

  /* Run your local dev server before starting the tests when targeting localhost */
  webServer: isLocal
    ? {
        timeout: 120 * 1000,
        command: "yarn turbo dev --filter=stock-center",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${baseURL}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Set timezone to ensure consistent date formatting across environments */
    timezoneId: "UTC",
  },
})
