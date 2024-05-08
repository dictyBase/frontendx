import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3004")

  await expect(page).toHaveTitle(/dictyBase/)
})

test(" title", async ({ page }) => {
  await page.goto("http://localhost:3004")

  await expect(page).toHaveTitle(/dictyBase/)
})
