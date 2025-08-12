/* eslint-disable unicorn/no-null */
import { test, expect } from "@playwright/test"
import { GeneOntologyAnnotationQueryResult } from "dicty-graphql-schema"
import { geneOntologyAnnotationQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0269114"

const EXPECTED_GOA = {
  id: "UniProtKB:Q9U7C9!801562706",
  type: "biological_process",
  date: "20121023",
  go_term: "regulation of mitotic nuclear division",
  evidence_code: "IMP",
  qualifier: "acts_upstream_of_or_within",
  publication: "PMID:11919178",
  assigned_by: "dictyBase",
  with: null,
  extensions: null,
}

test.beforeAll("Test Summary Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const goa = await apiContext.post(
    GRAPHQL_ENDPOINT,
    geneOntologyAnnotationQueryData(TEST_GENE),
  )
  const { data: goaData }: GeneOntologyAnnotationQueryResult = await goa.json()

  expect(goa.ok()).toBeTruthy()

  expect(goaData?.geneOntologyAnnotation).toContainEqual(
    expect.objectContaining(EXPECTED_GOA),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/goannotations`)
})

test("Renders Molecular Function panel", async ({ page }) => {
  await expect(page.getByText("Molecular Function")).toBeVisible()
  await expect(
    page.getByText("enables calmodulin binding").first(),
  ).toBeVisible()
  await expect(page.getByText("IEA").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "UniProtKB-KW:KW-0112" }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "GO_REF:0000043" }).first(),
  ).toBeVisible()
  await expect(page.getByText("2025-04-28").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "UniProt" }).first(),
  ).toBeVisible()
  await expect(
    page.getByText("existence_starts_and_ends_during").first(),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "GO:0000089" }).first(),
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
  await expect(firstMolecularFunctionRow.getByText("2005-06-30")).toBeVisible()
})
