import { test, expect } from "@playwright/test"

const SEARCH_TERM = "axe"

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

test("Hero search displays live suggestions and navigates to strain details", async ({
  page,
}) => {
  const searchInput = page.getByRole("textbox", {
    name: /search strains and plasmids/i,
  })
  await searchInput.fill(SEARCH_TERM)

  const suggestion = page.getByRole("link", {
    name: "pdsA552,axeA,axeB,axeC",
    exact: true,
  })
  await expect(suggestion).toBeVisible()
  await suggestion.click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\/DBS0236414/)
})

test("Hero search navigates to full catalog with query parameter on submit", async ({
  page,
}) => {
  const searchInput = page.getByRole("textbox", {
    name: /search strains and plasmids/i,
  })
  await searchInput.fill(SEARCH_TERM)
  await page.getByRole("button", { name: /submit search/i }).click()

  await expect(page).toHaveURL(/\/stockcenter\/catalog\?q=axe/)
})

test("Expands ordering steps guide and navigates to payment information", async ({
  page,
}) => {
  await page.getByRole("button", { name: /how to place an order/i }).click()
  await expect(page.getByText("Search or Browse the Catalog")).toBeVisible()

  await page
    .getByRole("link", { name: /view accepted payment methods/i })
    .click()
  await expect(page).toHaveURL(/\/stockcenter\/information\/payment\/show/)
})

test("Catalog category cards navigate to full, strain, and plasmid catalogs", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Full Catalog" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/catalog/)

  await page.goto("stockcenter")
  await page.getByRole("button", { name: "Strain Catalog" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\?group=all/)

  await page.goto("stockcenter")
  await page.getByRole("button", { name: "Plasmid Catalog" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\?group=all/)
})
