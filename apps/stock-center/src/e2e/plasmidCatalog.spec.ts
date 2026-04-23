import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { slice as Sslice } from "fp-ts/lib/string.js"
import { plasmidListQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`

test.beforeAll("Test Plasmid Catalog Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    plasmidListQueryData(),
  )
  const { data } = await response.json()
  expect(response.ok()).toBeTruthy()
  expect(data?.listPlasmids?.plasmids).toBeDefined()
  expect(data?.listPlasmids?.plasmids.length).toBeGreaterThan(0)
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/plasmids`)
})

test("Displays Plasmids from API", async ({ page }) => {
  const catalog = page.locator("tbody")
  const plasmidRows = catalog.getByRole("row").filter({ hasText: /DBP/ })
  await expect(plasmidRows.first()).toBeVisible()
  await expect(plasmidRows).toHaveCount(12)
})

test("Displays Plasmid Properties", async ({ page }) => {
  const catalog = page.locator("tbody")
  const firstPlasmidRow = catalog
    .getByRole("row")
    .filter({ hasText: /DBP/ })
    .first()
  const cells = firstPlasmidRow.getByRole("cell")
  // Descriptor cell
  await expect(cells.nth(0)).not.toBeEmpty()
  // Summary cell
  await expect(cells.nth(1)).not.toBeEmpty()
  // ID cell (starts with DBP)
  await expect(cells.nth(2)).toHaveText(/DBP/)
})

test("Scrolling to the bottom of the list initiates a fetch for more plasmids", async ({
  page,
}) => {
  const catalog = page.locator("tbody")
  await catalog.getByRole("progressbar").scrollIntoViewIfNeeded()
  const plasmidRows = catalog.getByRole("row").filter({ hasText: /DBP/ })
  await expect(plasmidRows).toHaveCount(24)
})

test("Clicking a plasmid link navigates to the plasmid details page", async ({
  page,
}) => {
  const catalog = page.locator("tbody")
  const firstPlasmidLink = catalog
    .getByRole("row")
    .filter({ hasText: /DBP/ })
    .first()
    .getByRole("link")
    .first()
  const plasmidName = await firstPlasmidLink.textContent()
  expect(plasmidName).toBeTruthy()
  await firstPlasmidLink.click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\/DBP/)
  await expect(
    page.getByRole("heading", {
      name: new RegExp(pipe(plasmidName as string, Sslice(0, 10))),
    }),
  ).toBeVisible()
})
