import { test, expect } from "../../testCoverage"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/dictyBase/)
})
