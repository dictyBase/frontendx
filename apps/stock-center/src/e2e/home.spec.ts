import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { map as Amap } from "fp-ts/lib/Array.js"

const CAROUSEL_IMAGE_ALT = 'img[alt*="mutant"]'

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3003/stockcenter")
})

test("DSC Home page snapshot", ({ page }) => {
  const main = page.locator("main")
  expect(main).toHaveScreenshot()
})

test("Displays welcome message", async ({ page }) => {
  const heading = page.getByRole("heading", {
    name: "Welcome to Dicty Stock Center (DSC)",
  })
  await expect(heading).toBeVisible()
})

test("The cart button navigates the user to their cart", async ({ page }) => {
  const cartLink = page.getByRole("link", { name: "shopping cart" })
  await expect(cartLink).toHaveAttribute("href", "/stockcenter/cart")

  await cartLink.click()
  await expect(page).toHaveURL(/\/stockcenter\/cart/)
})

test("Displays `catalog` links", async ({ page }) => {
  const main = page.locator("main")
  await expect(main.getByRole("link", { name: "Strain Catalog" })).toBeVisible()
  await expect(
    main.getByRole("link", { name: "Plasmid Catalog" }),
  ).toBeVisible()
  await expect(
    main.getByRole("link", { name: "Bacterial Strains" }),
  ).toBeVisible()
  await expect(main.getByRole("link", { name: "GWDI Catalog" })).toBeVisible()
  await expect(
    main.getByRole("link", { name: "GoldenBraid List" }),
  ).toBeVisible()
  await expect(
    main.getByRole("link", { name: "Additional Materials" }),
  ).toBeVisible()
})

test("Displays `downloads` links", async ({ page }) => {
  await expect(
    page.getByRole("link", { name: "Phenotype Ontology" }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Strain Characteristics" }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Mutagenesis Methods" }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Plasmid Keywords" }),
  ).toBeVisible()
})

test("All Carousel images are loaded", async ({ page }) => {
  const images = page.locator(CAROUSEL_IMAGE_ALT)

  // It is expected to have 6 images instead of 4 because the Carousel component renders the first and last images twice, probably so the
  // images can appear to be in an seamless, infinite loop.
  await expect(images).toHaveCount(6)

  await Promise.all(
    pipe(
      await images.all(),
      Amap((image) => expect(image).toBeVisible()),
    ),
  )

  await Promise.all(
    pipe(
      await images.all(),
      Amap((image) =>
        image.evaluate(({ naturalWidth }: HTMLImageElement) => naturalWidth),
      ),
      Amap(async (naturalWidth) =>
        expect(await naturalWidth).toBeGreaterThan(0),
      ),
    ),
  )
})
