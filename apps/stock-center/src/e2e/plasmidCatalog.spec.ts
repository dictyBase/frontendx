import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { dropRight as AdropRight, map as Amap } from "fp-ts/lib/Array.js"
import { slice as Sslice } from "fp-ts/lib/string.js"
import { makeBy as RNEAmakeBy } from "fp-ts/lib/ReadonlyNonEmptyArray.js"
import { plasmidListQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`

const EXPECTED_PLASMID = {
  id: "DBP0001102",
  in_stock: true,
  name: "pUPD2_T2A_TCGGGC_GGCTCG",
  summary:
    "GoldenBraid (doi.org/10.1093/nar/gkaa185) parts plasmid for cloning in the GoldenBraid system, contains T2A sequence with 5? TCGGGC and 3? GGCTCG overhangs; total vector length: 3026bp; parental vector: pUPD2; stored in NEB? Stable Competent E. coli",
}

test.beforeAll("Test Plasmid Catalog Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    plasmidListQueryData({
      filter: { plasmid_type: "REGULAR" },
      cursor: 0,
      limit: 12,
    }),
  )
  const { data } = await response.json()
  expect(response.ok()).toBeTruthy()
  expect(data?.listPlasmids?.plasmids).toContainEqual(EXPECTED_PLASMID)
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/plasmids`)
})

test("Displays Plasmids from API", async ({ page }) => {
  const catalog = page.locator("tbody")
  const plasmidRows = catalog
    .getByRole("row")
    .filter({ hasNot: page.getByRole("progressbar") })
  await expect(plasmidRows.first()).toBeVisible()
  await expect(plasmidRows).toHaveCount(12)
})

test("Displays Plasmid Properties", async ({ page }) => {
  const catalog = page.locator("tbody")
  const expectedRow = catalog.getByRole("row").first()
  await expect(
    expectedRow.getByRole("cell", { name: EXPECTED_PLASMID.name }),
  ).toBeVisible()
  await expect(
    expectedRow.getByRole("cell", {
      name: pipe(EXPECTED_PLASMID.summary, Sslice(0, 20)),
    }),
  ).toBeVisible()
})

test("Scrolling to the bottom of the list initiates a fetch for more plasmids", async ({
  page,
}) => {
  const catalog = page.locator("tbody")
  await catalog.getByRole("progressbar").scrollIntoViewIfNeeded()
  const plasmidRows = catalog
    .getByRole("row")
    .filter({ hasNot: page.getByRole("progressbar") })
  await expect(plasmidRows).toHaveCount(24)
})

test("Selecting `Golden Braid Plasmids` from `group` radio shows only Golden Braid plasmids", async ({
  page,
}) => {
  await page.getByRole("radio", { name: "Golden Braid Plasmids" }).click()

  const catalog = page.locator("tbody")
  await expect(catalog).toBeVisible()

  const plasmidRows = await catalog.getByRole("row").all()
  const assertions = pipe(
    plasmidRows,
    AdropRight(1),
    Amap((row) => expect(row).toHaveText(/pDGB/)),
  )
  await Promise.all(assertions)
})

test("Search by Descriptor", async ({ page }) => {
  const searchTerm = "pLoxNeoIII"
  const main = page.locator("main")
  const searchBox = main.getByRole("combobox", { name: "Search" })
  await searchBox.click()
  await page.getByRole("option", { name: "Descriptor" }).click()
  await searchBox.fill(searchTerm)
  await searchBox.press("Enter")

  const catalog = main.locator("tbody")
  const plasmidRows = catalog
    .getByRole("row")
    .filter({ hasNot: page.getByRole("progressbar") })
  await expect(plasmidRows.first()).toBeVisible()
  const plasmidRowsCount = await plasmidRows.count()
  await expect(plasmidRows).toHaveText(
    pipe(
      plasmidRowsCount,
      RNEAmakeBy(() => new RegExp(searchTerm)),
    ),
  )
})

test("Search by Summary", async ({ page }) => {
  const searchTerm = "Construct used for"
  const main = page.locator("main")
  const searchBox = main.getByRole("combobox", { name: "Search" })
  await searchBox.click()
  await page.getByRole("option", { name: "Summary" }).click()
  await searchBox.fill(searchTerm)
  await searchBox.press("Enter")

  const catalog = main.locator("tbody")
  const plasmidRows = catalog
    .getByRole("row")
    .filter({ hasNot: page.getByRole("progressbar") })
  await expect(plasmidRows.first()).toBeVisible()
  const plasmidRowsCount = await plasmidRows.count()
  await expect(plasmidRows).toHaveText(
    pipe(
      plasmidRowsCount,
      RNEAmakeBy(() => new RegExp(searchTerm)),
    ),
  )
})
