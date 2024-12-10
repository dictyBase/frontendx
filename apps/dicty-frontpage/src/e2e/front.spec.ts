import { test, expect } from "./baseFixtures"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/dictyBase/)
})
