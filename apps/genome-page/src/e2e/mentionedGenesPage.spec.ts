import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { makeBy as AmakeBy } from "fp-ts/lib/ReadonlyNonEmptyArray.js"

const TEST_GENE = "phg1A"
const TEST_PUBLICATION_ID = "29441327"
const RELATED_GENES_TEST_LIST_ID = "related-genes-list"

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/references/${TEST_PUBLICATION_ID}`)
})

test("Displays publication title", async ({ page }) => {
  await expect(page.getByText(/5 Genes mentioned in/)).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Inorganic Polyphosphate Is" }),
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
  await page.getByRole("combobox").click()
  await page.getByRole("option", { name: "Named Genes", exact: true }).click()

  const genesList = page.getByTestId(RELATED_GENES_TEST_LIST_ID)
  const filteredGenes = genesList.getByRole("button")

  // All genes should be visible since all are named
  await expect(filteredGenes).toHaveCount(5)

  await page.getByRole("combobox").click()
  await page.getByRole("option", { name: "Unnamed Genes", exact: true }).click()

  // No unnamed genes in this publication
  await expect(filteredGenes).toHaveCount(0)
})
