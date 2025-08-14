import { test, expect } from "@playwright/test"
import { ListPublicationsWithGeneQueryResult } from "dicty-graphql-schema"
import { listPublicationsWithGeneQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0269114"

const EXPECTED_REFERENCE = {
  related_genes: [
    { id: "DDB_G0269116", name: "cmbC" },
    { id: "DDB_G0288131", name: "cmbB" },
    { id: "DDB_G0269114", name: "numA" },
    { id: "DDB_G0279407", name: "calA" },
  ],
  id: "11483410",
  doi: "10.1016/s0898-6568(01)00187-5",
  title:
    "Detection of calmodulin-binding proteins and calmodulin-dependent phosphorylation linked to calmodulin-dependent chemotaxis to folic and cAMP in Dictyostelium.",
  journal: "Cellular signalling",
  pub_date: "2001-08-01T00:00:00.000Z",
  volume: "13",
  pages: "575-584",
  pub_type: "Research Support, Non-U.S. Gov't",
  source: "MED",
  issue: "8",
  authors: [
    { last_name: "Gauthier", rank: "0" },
    { last_name: "O'Day", rank: "1" },
  ],
}

test.beforeAll("Test Reference Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const request = await apiContext.post(
    GRAPHQL_ENDPOINT,
    listPublicationsWithGeneQueryData(TEST_GENE),
  )
  const { data: referenceData }: ListPublicationsWithGeneQueryResult =
    await request.json()

  expect(request.ok()).toBeTruthy()

  expect(referenceData?.listPublicationsWithGene).toContainEqual(
    expect.objectContaining(EXPECTED_REFERENCE),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/references`)
})

test("Displays References from API", async ({ page }) => {
  const references = page.locator("tbody").getByRole("row")

  const referenceItem = references.filter({
    hasText: "Detection of calmodulin-",
  })

  // Displays correct number of rows
  expect(page.getByText("17 References")).toBeVisible()
  expect(references).toHaveCount(17)
  // Displays full title
  await expect(referenceItem.getByText(EXPECTED_REFERENCE.title)).toBeVisible()
  // Displays publication date
  await expect(referenceItem.getByText("July 31st, 2001")).toBeVisible()
  // Displays journal
  await expect(
    referenceItem.getByText(EXPECTED_REFERENCE.journal),
  ).toBeVisible()
  // Displays pages
  await expect(referenceItem.getByText(EXPECTED_REFERENCE.pages)).toBeVisible()
  // Displays other genes mentioned
  await expect(referenceItem.getByText("calA")).toBeVisible()
  await expect(referenceItem.getByText("cmbB")).toBeVisible()
  await expect(referenceItem.getByText("cmbC")).toBeVisible()
  // Displays authors' last name
  await expect(
    referenceItem.getByText(EXPECTED_REFERENCE.authors[0].last_name),
  ).toBeVisible()
  await expect(
    referenceItem.getByText(EXPECTED_REFERENCE.authors[1].last_name),
  ).toBeVisible()
})

test("Clicking on mentioned gene navigates to that gene's summary page", async ({
  page,
}) => {
  await page.getByText("calA").first().click()
  await expect(
    page.getByRole("heading", { name: "Gene Summary for calA" }),
  ).toBeVisible()
})

test("Clicking on `See all` button navigates to the related genes page", async ({
  page,
}) => {
  await page.getByText("See All").first().click()
  await expect(
    page.getByRole("heading", { name: /Genes mentioned in/ }),
  ).toBeVisible()
})

test("Sorts by newest first by default", async ({ page }) => {
  const references = page.locator("tbody").getByRole("row")

  await expect(references.first()).toHaveText(/November 25th, 2019/)
  await expect(references.last()).toHaveText(/July 31st, 2001/)
})

test("Sort by oldest first", async ({ page }) => {
  const references = page.locator("tbody").getByRole("row")

  // eslint-disable-next-line sonarjs/no-duplicate-string
  await page.getByLabel("Newest First").click()
  await page.getByRole("option", { name: "Oldest First" }).click()

  await expect(references.first()).toHaveText(/July 31st, 2001/)
  await expect(references.last()).toHaveText(/November 25th, 2019/)
})

test("Sort by title (A to Z) ", async ({ page }) => {
  const references = page.locator("tbody").getByRole("row")

  await page.getByLabel("Newest First").click()
  await page.getByRole("option", { name: "Title (A to Z)" }).click()

  await expect(references.first()).toHaveText(/An N-terminal nuclear/)
  await expect(references.last()).toHaveText(/Signalling and sex in the/)
})

test("Sort by title (Z to A) ", async ({ page }) => {
  const references = page.locator("tbody").getByRole("row")

  await page.getByLabel("Newest First").click()
  await page.getByRole("option", { name: "Title (Z to A)" }).click()

  await expect(references.first()).toHaveText(/Signalling and sex in the/)
  await expect(references.last()).toHaveText(/An N-terminal nuclear/)
})
