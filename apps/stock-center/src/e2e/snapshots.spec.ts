import { test, expect } from "@playwright/test"
import { waitForImageLoad } from "./utils/waitForImageLoad"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
})

test("Header snapshot", async ({ page }) => {
  const header = page.locator("header")
  await expect(header).toHaveScreenshot()
})

test("DSC Home page snapshot", async ({ page }) => {
  const main = page.locator("main")
  await expect(main).toHaveScreenshot()
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
})
