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
  const referenceItem = page
    .getByLabel("phenotypes-table")
    .locator("div")
    .filter({ hasText: "Detection of calmodulin-" })

  await expect(page.getByText(EXPECTED_REFERENCE.title)).toBeVisible()
})
