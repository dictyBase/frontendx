import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { map as Amap } from "fp-ts/lib/Array.js"

const CAROUSEL_IMAGE_ALT = 'img[alt*="mutant"]'

test.beforeEach(async ({ page }) => {
  await page.goto("stockcenter")
})

test("The cart button navigates the user to their cart", async ({ page }) => {
  const cartLink = page.getByRole("link", { name: "shopping cart" })
  await expect(cartLink).toHaveAttribute("href", "/stockcenter/cart")

  await cartLink.click()
  await expect(page).toHaveURL(/\/stockcenter\/cart/)
})

test("Displays `downloads` links", async ({ page }) => {
  const dscHome = page.getByRole("main")
  await expect(dscHome.getByRole("link", { name: "Downloads" })).toBeVisible()
})
