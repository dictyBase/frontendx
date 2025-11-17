import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { slice as Sslice } from "fp-ts/lib/string.js"
import { makeBy as RNEAmakeBy } from "fp-ts/lib/ReadonlyNonEmptyArray.js"
import { plasmidListQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`

const EXPECTED_PLASMID = {
  id: "DBP0351791",
  label: "tor(1-476:MTRSLRKVEKLKNSEPTLCTK:479-2380)",
  summary:
    "CRISPR/Cas9 mutant of?tor; contains a 60 bp insertion after residue 476 with deletion of codons for residues 477 and 478",
  in_stock: false,
}

test.beforeAll("Test Plasmid Catalog Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    plasmidListQueryData(),
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
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBP/ })
  await expect(strainRows.first()).toBeVisible()
  await expect(strainRows).toHaveCount(12)
})

test("Displays Plasmid Properties", async ({ page }) => {
  const catalog = page.locator("tbody")
  const expectedRow = catalog
    .getByRole("row")
    .filter({ hasText: /DBP/ })
    .first()
  await expect(
    expectedRow.getByRole("cell", { name: EXPECTED_PLASMID.label }),
  ).toBeVisible()
  await expect(
    expectedRow.getByRole("cell", {
      name: pipe(EXPECTED_PLASMID.summary, Sslice(0, 20)),
    }),
  ).toBeVisible()
  await expect(
    expectedRow.getByRole("cell", { name: EXPECTED_PLASMID.id }),
  ).toBeVisible()
})

test("Scrolling to the bottom of the list initiates a fetch for more strains", async ({
  page,
}) => {
  const catalog = page.locator("tbody")
  await catalog.getByRole("progressbar").scrollIntoViewIfNeeded()
  const strainRows = catalog.getByRole("row").filter({ hasText: /DBP/ })
  await expect(strainRows).toHaveCount(24)
})
