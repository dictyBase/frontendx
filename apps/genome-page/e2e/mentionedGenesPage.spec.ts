import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/function"
import { makeBy as AmakeBy } from "fp-ts/ReadonlyNonEmptyArray"
import { ListPublicationsWithGeneQueryResult } from "dicty-graphql-schema"
import { listPublicationsWithGeneQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`
const TEST_GENE = "wrky1"
const TEST_PUBLICATION_ID = "18550419"
const RELATED_GENES_TEST_LIST_ID = "related-genes-list"

const EXPECTED_REFERENCE = {
  related_genes: [
    { id: "DDB_G0281931", name: "DDB_G0281931" },
    { id: "DDB_G0288511", name: "sadA" },
    { id: "DDB_G0292322", name: "DDB_G0292322" },
    { id: "DDB_G0290965", name: "trafM" },
    { id: "DDB_G0282069", name: "slrA" },
    { id: "DDB_G0287363", name: "sibA" },
    { id: "DDB_G0283265", name: "mkkA" },
    { id: "DDB_G0268712", name: "DDB_G0268712" },
    { id: "DDB_G0267444", name: "phg1A" },
    { id: "DDB_G0267692", name: "DDB_G0267692" },
    { id: "DDB_G0280263", name: "DDB_G0280263" },
    { id: "DDB_G0267406", name: "lmpA" },
    { id: "DDB_G0277703", name: "aplF" },
    { id: "DDB_G0275267", name: "wrky1" },
    { id: "DDB_G0267400", name: "hspD" },
    { id: "DDB_G0269292", name: "sugt1" },
    { id: "DDB_G0267630", name: "kil1" },
  ],
  id: "18550419",
  doi: "10.1016/j.mib.2008.05.005",
  title: "Eat, kill or die: when amoeba meets bacteria.",
  journal: "Current opinion in microbiology",
  pub_date: "2008-06-10T00:00:00.000Z",
  volume: "11",
  pages: "271-276",
  pub_type: "Research Support, Non-U.S. Gov't",
  source: "MED",
  issue: "3",
  authors: [
    { last_name: "Cosson", rank: "0" },
    { last_name: "Soldati", rank: "1" },
  ],
}

test.beforeAll("Test Reference Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    listPublicationsWithGeneQueryData(TEST_GENE),
  )
  const { data: referenceData }: ListPublicationsWithGeneQueryResult =
    await response.json()
  expect(response.ok()).toBeTruthy()

  expect(referenceData?.listPublicationsWithGene).toContainEqual(
    expect.objectContaining(EXPECTED_REFERENCE),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/references/${TEST_PUBLICATION_ID}`)
})

test("Displays publication title", async ({ page }) => {
  await expect(page.getByText(/17 Genes mentioned in/)).toBeVisible()
  await expect(
    page.getByRole("heading", { name: EXPECTED_REFERENCE.title }),
  ).toBeVisible()
})

test("Displays mentioned genes", async ({ page }) => {
  await expect(page.getByText(/17 of 17 Genes/)).toBeVisible()

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  // Gene items should be clickable; 16 on first page
  await expect(genesList.getByRole("button")).toHaveCount(16)
  await page.getByLabel("Go to next page").click()
  // 1 on second page
  await expect(genesList.getByRole("button")).toHaveCount(1)
})

test("Clicking on gene item navigates to that gene's summary page", async ({
  page,
}) => {
  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  await genesList.getByRole("button").first().click()
  await expect(
    page.getByRole("heading", { name: "Gene Summary for" }),
  ).toBeVisible()
})

test("Gene search", async ({ page }) => {
  const searchTerm = "sadA"
  const searchBox = page.getByPlaceholder("Filter Genes")
  await searchBox.click()
  await searchBox.fill(searchTerm)

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  const foundGenes = genesList.getByRole("button")
  const numberOfFoundGenes = await foundGenes.count()

  await expect(foundGenes).toHaveText(
    pipe(
      numberOfFoundGenes,
      AmakeBy(() => searchTerm),
    ),
  )
})

test("Gene filtering", async ({ page }) => {
  await page.getByRole("button", { name: "All Gene Types" }).click()
  await page.getByRole("option", { name: "Unnamed Genes", exact: true }).click()

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  const filteredGenes = genesList.getByRole("button")

  const unnamedGenesCount = await filteredGenes.count()

  await expect(filteredGenes).toHaveText(
    pipe(
      unnamedGenesCount,
      AmakeBy(() => /DDB_/),
    ),
  )

  await page.getByRole("button", { name: "Unnamed Genes" }).click()
  await page.getByRole("option", { name: "Named Genes", exact: true }).click()

  const namedGenesCount = await filteredGenes.count()

  await expect(filteredGenes).not.toHaveText(
    pipe(
      namedGenesCount,
      AmakeBy(() => /DDB_/),
    ),
  )
})
