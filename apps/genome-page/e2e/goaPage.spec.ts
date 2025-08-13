/* eslint-disable unicorn/no-null */
import { test, expect } from "@playwright/test"
import { GeneOntologyAnnotationQueryResult } from "dicty-graphql-schema"
import { geneOntologyAnnotationQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0267382"

const EXPECTED_GOA = {
  assigned_by: "dictyBase",
  date: "20190926",
  evidence_code: "IMP",
  extensions: null,
  go_term: "mitotic cytokinesis",
  id: "UniProtKB:P27133!615349166",
  publication: "PMID:10098934",
  qualifier: "acts_upstream_of_or_within",
  type: "biological_process",
  with: null,
}

test.beforeAll(
  "Test Gene Ontology Annotation Page API",
  async ({ playwright }) => {
    const apiContext = await playwright.request.newContext()

    const goa = await apiContext.post(
      GRAPHQL_ENDPOINT,
      geneOntologyAnnotationQueryData(TEST_GENE),
    )
    const { data: goaData }: GeneOntologyAnnotationQueryResult =
      await goa.json()

    expect(goa.ok()).toBeTruthy()

    expect(goaData?.geneOntologyAnnotation).toContainEqual(
      expect.objectContaining(EXPECTED_GOA),
    )
  },
)

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/goannotations`)
})

test("Renders Molecular Function panel", async ({ page }) => {
  await expect(page.getByText("Molecular Function")).toBeVisible()
  await expect(page.getByText("enables protein binding").first()).toBeVisible()
  await expect(page.getByText("IEA").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "UniProtKB-KW:KW-0009" }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "GO_REF:0000043" }).first(),
  ).toBeVisible()
  await expect(page.getByText("2025-04-28").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "UniProt" }).first(),
  ).toBeVisible()
  await expect(page.getByText("existence_overlaps").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "GO:0000281" }).first(),
  ).toBeVisible()
})

test("Collapses panel when Accordian Summary is clicked ", async ({ page }) => {
  const molecularFunctionRow = page.getByText("enables protein binding").first()
  await expect(molecularFunctionRow).toBeVisible()
  await page.getByText("Molecular Function").click()
  await expect(molecularFunctionRow).not.toBeVisible()
})

test("Sorts data when property in the header is clicked", async ({ page }) => {
  const firstMolecularFunctionRow = page.getByRole("row").nth(1)
  await expect(firstMolecularFunctionRow).toBeVisible()
  await expect(firstMolecularFunctionRow.getByText("2025-04-28")).toBeVisible()
  await page.getByRole("button", { name: "Date" }).first().click()
  await expect(firstMolecularFunctionRow.getByText("2020-03-18")).toBeVisible()
})

test("Shows only Experimental GO in the `Experimental GO` subtab", async ({
  page,
}) => {
  // Experimental & Manual
  await expect(page.getByText("IPI").first()).toBeVisible()
  // Electronic
  await expect(page.getByText("IEA").first()).toBeVisible()
  // Manual
  await expect(page.getByText("IBA").first()).toBeVisible()
  await page.getByText("Experimental GO").click()
  await expect(page.getByText("IPI").first()).toBeVisible()
  await expect(page.getByText("IEA").first()).not.toBeVisible()
  await expect(page.getByText("IBA").first()).not.toBeVisible()
})

test("Shows only Manual GO in the `Manual GO` subtab", async ({ page }) => {
  // Experimental & Manual
  await expect(page.getByText("IPI").first()).toBeVisible()
  // Electronic
  await expect(page.getByText("IEA").first()).toBeVisible()
  // Manual
  await expect(page.getByText("IBA").first()).toBeVisible()

  await page.getByText("Manual GO").click()

  await expect(page.getByText("IPI").first()).toBeVisible()
  await expect(page.getByText("IEA").first()).not.toBeVisible()
  await expect(page.getByText("IBA").first()).toBeVisible()
})

test("Shows only Electronic GO in the `Electronic GO` subtab", async ({
  page,
}) => {
  // Experimental & Manual
  await expect(page.getByText("IPI").first()).toBeVisible()
  // Electronic
  await expect(page.getByText("IEA").first()).toBeVisible()
  // Manual
  await expect(page.getByText("IBA").first()).toBeVisible()

  await page.getByText("Electronic GO").click()

  await expect(page.getByText("IPI").first()).not.toBeVisible()
  await expect(page.getByText("IEA").first()).toBeVisible()
  await expect(page.getByText("IBA").first()).not.toBeVisible()
})
