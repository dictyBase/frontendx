import { test, expect } from "./baseFixtures"
import { waitForImageLoad } from "./utils"

test("Header snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const header = page.locator("header")
  await expect(header).toHaveScreenshot()
})

test("Footer snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const header = page.locator("footer")
  await expect(header).toHaveScreenshot()
})
