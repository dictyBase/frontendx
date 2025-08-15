import { defineConfig, devices } from "@playwright/test"

const GLOBAL_SETUP = "global setup"
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: {
    timeout: 30_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.05 },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: GLOBAL_SETUP,
      testMatch: /global\.setup\.ts/,
    },
    // {
    //  name: "chromium",
    //  use: { ...devices["Desktop Chrome"] },
    // },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: [GLOBAL_SETUP],
    },
    // {
    //  name: "webkit",
    //  use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
      dependencies: [GLOBAL_SETUP],
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
      dependencies: [GLOBAL_SETUP],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "yarn dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.BASE_URL}/gene`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
})
