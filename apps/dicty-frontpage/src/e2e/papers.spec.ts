import { test, expect } from "./baseFixtures"

test("Renders Latest Publications heading", async ({ page }) => {
  await page.goto("papers")
  const heading = page.getByRole("heading", { name: /Latest Publications/ })
  expect(page).toHaveURL(/^.*\/papers$/)
  await expect(heading).toBeInViewport()
})
