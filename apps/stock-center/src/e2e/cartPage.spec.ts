import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/cart`)
})

test("displays empty cart message when cart is empty", async ({ page }) => {
  await expect(
    page.getByText(
      "Your shopping cart is empty. Please add at least one item to your cart before checking out.",
    ),
  ).toBeVisible()
})

test("displays strain catalog navigation button", async ({ page }) => {
  const strainCatalogButton = page.getByRole("button", {
    name: "Strain Catalog",
  })
  await expect(strainCatalogButton).toBeVisible()
})

test("displays plasmid catalog navigation button", async ({ page }) => {
  const plasmidCatalogButton = page.getByRole("button", {
    name: "Plasmid Catalog",
  })
  await expect(plasmidCatalogButton).toBeVisible()
})

test("strain catalog button navigates to strain catalog page", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Strain Catalog" }).click()
  await expect(page).toHaveURL(/.*\/stockcenter\/strains/)
})

test("plasmid catalog button navigates to plasmid catalog page", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Plasmid Catalog" }).click()
  await expect(page).toHaveURL(/.*\/stockcenter\/plasmids/)
})

test.describe("Cart with Item", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/stockcenter/strains/DBS0391520")
    await page.getByRole("button", { name: "Add to Cart" }).click()
    await page.getByRole("button", { name: "View Cart" }).click()
  })

  test("displays cart with item after adding strain from strain page", async ({
    page,
  }) => {
    await expect(page.getByText("[smp3]-")).toBeVisible()
    await expect(page.getByText("DBS0391520")).toBeVisible()
    await expect(
      page.getByText(
        "Genome Wide Dictyostelium Insertion bank (GWDI) intergenic mutant",
      ),
    ).toBeVisible()
  })

  test("displays cost summary with item count and total when cart has items", async ({
    page,
  }) => {
    await expect(page.getByText("Strains 1 item:")).toBeVisible()
    await expect(page.getByText("$30.00").first()).toBeVisible()
    await expect(page.getByText("Total")).toBeVisible()
  })

  test("displays strain and plasmid catalog buttons when cart has items", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Strains Catalog" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Plasmids Catalog" }),
    ).toBeVisible()
  })

  test("proceed to checkout button navigates to order form page", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Proceed to Checkout" }).click()

    await expect(page).toHaveURL(/.*\/stockcenter\/order/)
  })
})
