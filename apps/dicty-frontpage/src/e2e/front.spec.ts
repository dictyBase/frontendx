import { test, expect } from "@playwright/test"

const BASE_URL = process.env.FRONTPAGE_URL || "http://localhost:3004"

test("has title", async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle(/dictyBase/)
})

test("All Links are working", async ({ page }) => {
  await page.goto(BASE_URL)
  const links = await page.getByRole("link").all()
  for (const link of links) {
    const [response] = await Promise.all([
      page.waitForResponse((response) => response.status() === 200),
      link.click(),
    ])
    expect(response.status()).toBe(200)
  }
})
