import { test, expect } from "@playwright/test"

const BASE_URL = process.env.FRONTPAGE_URL || "http://localhost:3004"

test("has title", async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle(/dictyBase/)
})

test("All Links are working", async ({ page }) => {
  await page.goto(BASE_URL)
  page.on("response", (response) => {
    expect(response).toBeOk()
  })
  for (const link of await page.getByRole("link").all()) {
    console.log(link)
    await link.click()
  }
})
