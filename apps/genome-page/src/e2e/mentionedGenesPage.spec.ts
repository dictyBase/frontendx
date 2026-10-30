import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { makeBy as AmakeBy } from "fp-ts/lib/ReadonlyNonEmptyArray.js"
import { ListPublicationsWithGeneQueryResult } from "dicty-graphql-schema"
import { listPublicationsWithGeneQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_GRAPHQL_SERVER}/graphql`
const TEST_GENE = "phg1A"
const TEST_PUBLICATION_ID = "29441327"
const RELATED_GENES_TEST_LIST_ID = "related-genes-list"

const EXPECTED_REFERENCE = {
  related_genes: [
    { id: "DDB_G0290009", name: "spr" },
    { id: "DDB_G0288481", name: "gchA" },
    { id: "DDB_G0267444", name: "phg1A" },
    { id: "DDB_G0279095", name: "ptsA" },
    { id: "DDB_G0267630", name: "kil1" },
  ],
  id: "29441327",
  doi: "10.3389/fcimb.2018.00008",
  title:
    "Inorganic Polyphosphate Is Essential for  Typhimurium Virulence and Survival in .",
  journal: "Frontiers in cellular and infection microbiology",
  pub_date: "2018-01-01T00:00:00.000Z",
  volume: "",
  pages: "",
  pub_type: "",
  source: "MED",
  issue: "",
  authors: [
    { last_name: "Varas", rank: "0" },
    { last_name: "Riquelme-Barrios", rank: "1" },
    { last_name: "Valenzuela", rank: "2" },
    { last_name: "Marcoleta", rank: "3" },
    { last_name: "Berríos-Pastén", rank: "4" },
    { last_name: "Santiviago", rank: "5" },
    { last_name: "Chávez", rank: "6" },
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
  await expect(page.getByText(/5 Genes mentioned in/)).toBeVisible()
  await expect(
    page.getByRole("heading", { name: EXPECTED_REFERENCE.title }),
  ).toBeVisible()
})

test("Displays mentioned genes", async ({ page }) => {
  await expect(page.getByText(/5 of 5 Genes/)).toBeVisible()

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  // Gene items should be clickable; all 5 on first page
  await expect(genesList.getByRole("button")).toHaveCount(5)
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
  const searchTerm = "kil1"
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
  // All genes in this publication are named (no DDB_ genes), so filter for named genes
  await page.getByRole("button", { name: "All Gene Types" }).click()
  await page.getByRole("option", { name: "Named Genes", exact: true }).click()

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  const filteredGenes = genesList.getByRole("button")

  // All genes should be visible since all are named
  await expect(filteredGenes).toHaveCount(5)

  await page.getByRole("button", { name: "Named Genes" }).click()
  await page.getByRole("option", { name: "Unnamed Genes", exact: true }).click()

  // No unnamed genes in this publication
  await expect(filteredGenes).toHaveCount(0)
})
