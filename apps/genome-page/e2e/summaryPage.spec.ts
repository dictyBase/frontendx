import { test, expect } from "@playwright/test"
import { GeneOntologyAnnotationQueryResult } from "dicty-graphql-schema"
import {
  geneGeneralInformationSummaryQueryData,
  geneOntologyAnnotationSummaryQueryData,
} from "./utils/gqlRequestData"

const TEST_GENE = "DDB_G0267382"

const EXPECTED_GENERAL_INFO = {
  id: "DDB_G0267382",
  gene_product: "coronin",
  name_description: ["corA = CORonin"],
  synonyms: [],
  description:
    "actin binding protein regulating actin nucleation, involved in cytokinesis and cell motility",
}
const EXPECTED_GOA = {
  id: "UniProtKB:P27133!615349167",
  type: "biological_process",
  date: "20190926",
  go_term: "mitotic cytokinesis",
  evidence_code: "IGI",
  with: [{ id: "P08799", db: "UniProtKB", name: "" }],
  // eslint-disable-next-line unicorn/no-null
  extensions: null,
}

test.beforeAll("Renders Gene General Information", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const geneGeneralInformation = await apiContext.post(
    "https://graphql.dictybase.dev/graphql",
    geneGeneralInformationSummaryQueryData(TEST_GENE),
  )
  const goaSummary = await apiContext.post(
    "https://graphql.dictybase.dev/graphql",
    geneOntologyAnnotationSummaryQueryData(TEST_GENE),
  )

  expect(goaSummary.ok()).toBeTruthy()
  expect(geneGeneralInformation.ok()).toBeTruthy()

  expect(await geneGeneralInformation.json()).toEqual(
    expect.objectContaining({
      data: {
        geneGeneralInformation: EXPECTED_GENERAL_INFO,
      },
    }),
  )

  const { data: goaData }: GeneOntologyAnnotationQueryResult =
    await goaSummary.json()

  expect(goaData?.geneOntologyAnnotation).toContainEqual(
    expect.objectContaining(EXPECTED_GOA),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}`)
})

test.describe(() => {
  test.describe.configure({ retries: 3 })
  test("Renders General information panel", async ({ page }) => {
    // General Information Panel
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
    await expect(
      page.getByText(EXPECTED_GENERAL_INFO.description),
    ).toBeVisible()
  })

  test("Renders Gene Ontology Annotations Panel ", async ({ page }) => {
    // General Information Panel
    await expect(page.getByText("Gene Ontology Annotations")).toBeVisible()
    await expect(
      page.getByText("protein bindingwith UniProtKB:Q54K81 (IPI)"),
    ).toBeVisible()
    await expect(page.getByText("phagocytosis (IMP)")).toBeVisible()
    await expect(
      page.getByText("pathogen-containing vacuole (IDA)"),
    ).toBeVisible()
  })

  test("Renders Publication Panel", async ({ page }) => {
    // General Information Panel
    await expect(page.getByText("Publications (5 of 90)")).toBeVisible()
  })
})
