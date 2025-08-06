/* eslint-disable unicorn/no-null */
import { test, expect } from "@playwright/test"
import {
  GeneOntologyAnnotationQueryResult,
  ListPublicationsWithGeneSummaryQueryResult,
} from "dicty-graphql-schema"
import {
  geneGeneralInformationSummaryQueryData,
  geneOntologyAnnotationSummaryQueryData,
  listPublicationsWithGeneSummaryQueryData,
} from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0269114"

const EXPECTED_GENERAL_INFO = {
  id: "DDB_G0269114",
  name_description: ["num = NUcleoMorphin"],
  gene_product: "nucleomorphin\ncalmodulin-binding protein",
  synonyms: [],
  description:
    "there are three reported numA isoforms, the largest 97 kDa numA2, the 66 kDa numA1, and the smallest 43 kDA numA3; all isoforms contain a nuclear localization signal, a CaM binding domain, and a DEED (D/E repeat) domain; the larger numA2 contains an additional BRCT (Breast Cancer C_Terminal) domain",
}

const EXPECTED_GOA = {
  id: "UniProtKB:Q9U7C9!801562706",
  type: "biological_process",
  date: "20121023",
  go_term: "regulation of mitotic nuclear division",
  evidence_code: "IMP",
  with: null,
  extensions: null,
}

const EXPECTED_REFERENCE = {
  id: "30781559",
  title:
    "Proteins of the Nucleolus of \u003Ci\u003EDictyostelium discoideum\u003C/i\u003E: Nucleolar Compartmentalization, Targeting Sequences, Protein Translocations and Binding Partners.",
  journal: "Cells",
  pages: "E167",
  issue: "2",
  authors: [{ last_name: "O'Day" }],
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

  const { data: goaData }: GeneOntologyAnnotationQueryResult =
    await goaSummary.json()

  const { data: referencesData }: ListPublicationsWithGeneSummaryQueryResult =
    await references.json()

  expect(goaSummary.ok()).toBeTruthy()
  expect(geneGeneralInformation.ok()).toBeTruthy()
  expect(references.ok()).toBeTruthy()
  expect(await geneGeneralInformation.json()).toEqual(
    expect.objectContaining({
      data: {
        geneGeneralInformation: EXPECTED_GENERAL_INFO,
      },
    }),
  )
  expect(goaData?.geneOntologyAnnotation).toContainEqual(
    expect.objectContaining(EXPECTED_GOA),
  )
  expect(referencesData?.listPublicationsWithGene).toContainEqual(
    expect.objectContaining(EXPECTED_REFERENCE),
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

test("Renders Gene Ontology Annotations Panel ", async ({ page }) => {
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
