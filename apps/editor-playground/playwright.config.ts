import { defineConfig, devices } from "@playwright/test"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? "github" : "list",
  timeout: 5000,
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
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    timeout: 120 * 1000,
    command: "yarn dev",
    url: process.env.BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.BASE_URL}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
})
