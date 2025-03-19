import { test, expect } from "./baseFixtures"

test("Header snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  const header = page.locator("header")
  await expect(header).toHaveScreenshot()
})

test("Footer snapshot", async ({ page }) => {
  await page.goto("/")
  const header = page.locator("footer")
  await expect(header).toHaveScreenshot()
})
