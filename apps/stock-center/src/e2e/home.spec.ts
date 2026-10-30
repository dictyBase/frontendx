import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("stockcenter")
})

test("The cart button navigates the user to their cart", async ({ page }) => {
  const cartLink = page.getByRole("button", { name: /cart/i })

  await cartLink.click()
  await expect(page).toHaveURL(/\/stockcenter\/cart/)
})

test("Displays `downloads` links", async ({ page }) => {
  const dscHome = page.getByRole("main")
  await expect(dscHome.getByRole("link", { name: "Downloads" })).toBeVisible()
})
