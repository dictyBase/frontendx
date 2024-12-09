import { test, expect } from "playwright-coverage"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/dictyBase/)
})
