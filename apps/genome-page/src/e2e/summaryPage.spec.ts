/* eslint-disable unicorn/no-null */
import { test, expect } from "@playwright/test"
import {
  GeneOntologyAnnotationSummaryQueryResult,
  ListPublicationsWithGeneSummaryQueryResult,
} from "dicty-graphql-schema"
import {
  geneGeneralInformationSummaryQueryData,
  geneOntologyAnnotationSummaryQueryData,
  listPublicationsWithGeneSummaryQueryData,
} from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0269114"

const EXPECTED_GENERAL_INFO = {
  id: "DDB_G0269114",
  name_description: ["num = NUcleoMorphin"],
  gene_product: "nucleomorphin\ncalmodulin-binding protein",
  synonyms: ["cmbA", "numB", "numA1", "numA2", "numC", "numA3"],
  description:
    "there are three reported numA isoforms, the largest 97 kDa numA2, the 66 kDa numA1, and the smallest 43 kDA numA3; all isoforms contain a nuclear localization signal, a CaM binding domain, and a DEED (D/E repeat) domain; the larger numA2 contains an additional BRCT (Breast Cancer C_Terminal) domain",
}

const EXPECTED_GENERAL_INFO_SHAPE = {
  id: expect.any(String),
  description: expect.any(String),
  gene_product: expect.any(String),
  name_description: expect.arrayOf(expect.any(String)),
  synonyms: expect.arrayOf(expect.any(String)),
}
const EXPECTED_GOA_SHAPE = {
  date: expect.any(String),
  evidence_code: expect.any(String),
  extensions: null,
  go_term: expect.any(String),
  id: expect.any(String),
  type: expect.any(String),
  with: null,
}

const EXPECTED_REFERENCE_SHAPE = {
  id: expect.any(String),
  title: expect.any(String),
  journal: expect.any(String),
  pages: expect.any(String),
  issue: expect.any(String),
  authors: expect.arrayContaining([{ last_name: expect.any(String) }]),
}

test.beforeAll("Test Summary Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const geneGeneralInformation = await apiContext.post(
    GRAPHQL_ENDPOINT,
    geneGeneralInformationSummaryQueryData(TEST_GENE),
  )
  const goaSummary = await apiContext.post(
    GRAPHQL_ENDPOINT,
    geneOntologyAnnotationSummaryQueryData(TEST_GENE),
  )

  const references = await apiContext.post(
    GRAPHQL_ENDPOINT,
    listPublicationsWithGeneSummaryQueryData(TEST_GENE),
  )

  const { data: goaData }: GeneOntologyAnnotationSummaryQueryResult =
    await goaSummary.json()

  const { data: referencesData }: ListPublicationsWithGeneSummaryQueryResult =
    await references.json()

  expect(goaSummary.ok()).toBeTruthy()
  expect(geneGeneralInformation.ok()).toBeTruthy()
  expect(references.ok()).toBeTruthy()

  expect(await geneGeneralInformation.json()).toEqual({
    data: {
      geneGeneralInformation: EXPECTED_GENERAL_INFO_SHAPE,
    },
  })
  expect(goaData?.geneOntologyAnnotation).toContainEqual(EXPECTED_GOA_SHAPE)
  expect(referencesData?.listPublicationsWithGene).toContainEqual(
    EXPECTED_REFERENCE_SHAPE,
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}`)
})

test("Renders General information panel", async ({ page }) => {
  await expect(page.getByText("General Information")).toBeVisible()
  await expect(
    page.getByText(new RegExp(`^${EXPECTED_GENERAL_INFO.id}$`)),
  ).toBeVisible()
  await expect(
    page.getByText(new RegExp(`^${EXPECTED_GENERAL_INFO.gene_product}$`)),
  ).toBeVisible()
  await expect(
    page.getByText(EXPECTED_GENERAL_INFO.name_description[0]),
  ).toBeVisible()
  await expect(page.getByText(EXPECTED_GENERAL_INFO.description)).toBeVisible()
})

test("Renders Gene Ontology Annotations Panel", async ({ page }) => {
  await expect(page.getByText("Gene Ontology Annotations")).toBeVisible()
  await expect(
    page.getByText("protein binding with UniProtKB:Q54RF4 (IPI)"),
  ).toBeVisible()
  await expect(
    page.getByText("regulation of mitotic nuclear division (IMP)"),
  ).toBeVisible()
  await expect(
    page.getByText(
      "nuclear envelope existence_starts_and_ends_during GO:0000089 (IDA)",
    ),
  ).toBeVisible()
})

test("Renders Publication Panel", async ({ page }) => {
  await expect(page.getByText("Publications (5 of 17)")).toBeVisible()
})
