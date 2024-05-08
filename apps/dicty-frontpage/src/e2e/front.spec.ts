import { test, expect } from "@playwright/test"

const frontpageUrl = "http://localhost:3004" 

test("has title", async ({ page }) => {
  await page.goto(frontpageUrl)

  await expect(page).toHaveTitle(/dictyBase/)
})

test(" title", async ({ page }) => {
  await page.goto(frontpageUrl)

  await expect(page).toHaveTitle(/dictyBase/)
})
