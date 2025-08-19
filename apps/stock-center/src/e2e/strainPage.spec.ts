import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { map as Amap } from "fp-ts/lib/Array.js"
import { strainQueryData } from "./utils/gqlRequestData"
import { EXPECTED_STRAIN } from "./utils/expectedData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`
const TEST_STRAIN_ID = "DBS0350877"

test.beforeAll("Test Reference Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    strainQueryData(TEST_STRAIN_ID),
  )
  expect(response.ok()).toBeTruthy()
  expect(await response.json()).toEqual({
    data: { strain: EXPECTED_STRAIN },
  })
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/strains/${TEST_STRAIN_ID}`)
})

test("Displays Strain Details", async ({ page }) => {
  const details = page.locator("main").getByRole("list")
  // Strain Descriptor
  await expect(details.getByText(/piaA\(G917D\)\/hephA-/)).toBeVisible()
  // Strain Names
  await expect(details.getByText(/HSB1HectPH1-Ko/)).toBeVisible()
  await expect(
    details.getByText(
      /suppressor mutant; deletion of hephA suppresses the agg- phenotype/,
    ),
  ).toBeVisible()
  await expect(details.getByText(EXPECTED_STRAIN.id)).toBeVisible()
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.characteristics,
      Amap((characteristic) =>
        expect(page.getByText(characteristic).first()).toBeVisible(),
      ),
    ),
  )
  await expect(
    details.getByText(EXPECTED_STRAIN.genetic_modification),
  ).toBeVisible()
  await expect(
    details.getByText(EXPECTED_STRAIN.mutagenesis_method),
  ).toBeVisible()
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.genotypes,
      Amap((genotype) =>
        expect(page.getByText(genotype).first()).toBeVisible(),
      ),
    ),
  )
})
