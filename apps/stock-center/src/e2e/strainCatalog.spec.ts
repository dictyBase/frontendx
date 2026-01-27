import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { slice as Sslice } from "fp-ts/lib/string.js"
import { makeBy as RNEAmakeBy } from "fp-ts/lib/ReadonlyNonEmptyArray.js"
import { strainListQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`

const EXPECTED_STRAIN = {
  id: "DBS0351791",
  label: "tor(1-476:MTRSLRKVEKLKNSEPTLCTK:479-2380)",
  summary:
    "CRISPR/Cas9 mutant of?tor; contains a 60 bp insertion after residue 476 with deletion of codons for residues 477 and 478",
  in_stock: false,
}

test.beforeAll("Test Strain Catalog Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    strainListQueryData(0, { strain_type: "REGULAR" }, 12),
  )
  const { data } = await response.json()
  expect(response.ok()).toBeTruthy()
  expect(data?.listStrains?.strains).toContainEqual(EXPECTED_STRAIN)
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/strains`)
})

test("Displays Strains from API", async ({ page }) => {
  const catalog = page.locator("tbody")
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  await expect(strainRows.first()).toBeVisible()
  await expect(strainRows).toHaveCount(12)
})

test("Displays Strain Properties", async ({ page }) => {
  const catalog = page.locator("tbody")
  const expectedRow = catalog
    .getByRole("row")
    .filter({ hasText: /DBS/ })
    .first()
  await expect(
    expectedRow.getByRole("cell", { name: EXPECTED_STRAIN.label }),
  ).toBeVisible()
  await expect(
    expectedRow.getByRole("cell", {
      name: pipe(EXPECTED_STRAIN.summary, Sslice(0, 20)),
    }),
  ).toBeVisible()
  await expect(
    expectedRow.getByRole("cell", { name: EXPECTED_STRAIN.id }),
  ).toBeVisible()
})

test("Scrolling to the bottom of the list initiates a fetch for more strains", async ({
  page,
}) => {
  const catalog = page.locator("tbody")
  await catalog.getByRole("progressbar").scrollIntoViewIfNeeded()
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  await expect(strainRows).toHaveCount(24)
})

test("Selecting `GWDI Strains` from `group` dropdown shows only GWDI strains", async ({
  page,
}) => {
  await page.getByText("Regular Strains").click()
  await page.getByRole("option", { name: "GWDI Strains" }).click()

  const catalog = page.locator("tbody")
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  await expect(strainRows.first()).toBeVisible()
  const strainRowsCount = await strainRows.count()
  // expect all strain rows to indicate that they are `GWDI` strains
  await expect(strainRows).toHaveText(
    pipe(
      strainRowsCount,
      RNEAmakeBy(() => /GWDI/),
    ),
  )
})

test("Selecting `All Available Strains` from `group` dropdown shows only in-stock strains", async ({
  page,
}) => {
  await page.getByText("Regular Strains").click()
  await page.getByRole("option", { name: "All Available Strains" }).click()

  const catalog = page.locator("tbody")
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  const availableStrainRows = await page.getByRole("cell", {
    name: "Add to shopping cart",
  })
  await expect(availableStrainRows.first()).toBeVisible()
  // Every strain row should have a shopping cart button
  await expect(strainRows).toHaveCount(await availableStrainRows.count())
})

test("Search by Descriptor", async ({ page }) => {
  const searchTerm = "corA"
  const main = page.locator("main")
  const searchBox = main.getByRole("combobox", { name: "Search" })
  await searchBox.click()
  await page.getByRole("option", { name: "Descriptor" }).click()
  await searchBox.fill(searchTerm)
  await searchBox.press("Enter")

  const catalog = main.locator("tbody")
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  await expect(strainRows.first()).toBeVisible()
  const strainRowsCount = await strainRows.count()
  await expect(strainRows).toHaveText(
    pipe(
      strainRowsCount,
      RNEAmakeBy(() => new RegExp(searchTerm)),
    ),
  )
})

test("Search by Summary", async ({ page }) => {
  const searchTerm = "antisense"
  const main = page.locator("main")
  const searchBox = main.getByRole("combobox", { name: "Search" })
  await searchBox.click()
  await page.getByRole("option", { name: "Summary" }).click()
  await searchBox.fill(searchTerm)
  await searchBox.press("Enter")

  const catalog = main.locator("tbody")
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBS/ })
  await expect(strainRows.first()).toBeVisible()
  const strainRowsCount = await strainRows.count()
  await expect(strainRows).toHaveText(
    pipe(
      strainRowsCount,
      RNEAmakeBy(() => new RegExp(searchTerm)),
    ),
  )
})
