import { test, expect } from "@playwright/test"

const BASE_URL = process.env.FRONTPAGE_URL || "http://localhost:3004"

test("has title", async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle(/dictyBase/)
})
