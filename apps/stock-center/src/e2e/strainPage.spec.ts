import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { map as Amap } from "fp-ts/lib/Array.js"
import {
  fromNullable as OfromNullable,
  match as Omatch,
} from "fp-ts/lib/Option.js"
import { strainQueryData } from "./utils/gqlRequestData"
import { EXPECTED_STRAIN } from "./utils/expectedData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`
const TEST_STRAIN_ID = "DBS0350877"

test.beforeAll("Test Strain Details Page API", async ({ playwright }) => {
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
  // Strain Summary
  await expect(
    details.getByText(
      /suppressor mutant; deletion of hephA suppresses the agg- phenotype/,
    ),
  ).toBeVisible()
  // Systematic Name
  await expect(details.getByText(EXPECTED_STRAIN.id)).toBeVisible()
  // Strain Characteristics
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.characteristics,
      Amap((characteristic) =>
        expect(page.getByText(characteristic).first()).toBeVisible(),
      ),
    ),
  )
  // Genetic Modification
  await expect(
    details.getByText(EXPECTED_STRAIN.genetic_modification),
  ).toBeVisible()
  // Mutagenesis Method
  await expect(
    details.getByText(EXPECTED_STRAIN.mutagenesis_method),
  ).toBeVisible()
  // Genotype
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.genotypes,
      Amap((genotype) =>
        expect(page.getByText(genotype).first()).toBeVisible(),
      ),
    ),
  )
  // Species
  await expect(
    details.getByText(new RegExp(`^${EXPECTED_STRAIN.species}$`)),
  ).toBeVisible()
  // Depositor
  await expect(
    details.getByText(
      `${EXPECTED_STRAIN.depositor.first_name} ${EXPECTED_STRAIN.depositor.last_name}`,
    ),
  ).toBeVisible()
  // Reference(s)
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.publications,
      Amap(({ title }) => expect(page.getByText(title)).toBeVisible()),
    ),
  )
})

test("Copy to strain ID to clipboard", async ({ page }) => {
  const mainContent = page.locator("main")
  await expect(mainContent.getByTitle("Copy ID to clipboard")).toBeVisible()
})

test("Add to Cart function, return to strain details", async ({ page }) => {
  const mainContent = page.locator("main")
  const cartButton = mainContent.getByRole("button", { name: "Add to Cart" })

  await expect(cartButton).toBeVisible()

  await cartButton.click()

  await expect(
    page.getByRole("heading", { name: "Added to Cart" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Continue Shopping" }).click()
  await expect(
    mainContent.getByRole("button", { name: "Remove from Cart" }),
  ).toBeVisible()
})

test("Add to Cart function, go to cart", async ({ page }) => {
  const mainContent = page.locator("main")
  const cartButton = mainContent.getByRole("button", { name: "Add to Cart" })

  await expect(cartButton).toBeVisible()

  await cartButton.click()

  await expect(
    page.getByRole("heading", { name: "Added to Cart" }),
  ).toBeVisible()
  await page.getByRole("link", { name: "View Cart" }).click()
  await expect(
    mainContent.getByRole("heading", { name: "Your Shopping Cart" }),
  ).toBeVisible()
})

test("Phenotypes tab", async ({ page }) => {
  await page.getByRole("tab", { name: "Phenotypes" }).click()
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ phenotype }) =>
        expect(page.getByRole("link", { name: phenotype })).toBeVisible(),
      ),
    ),
  )
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ note }) => expect(page.getByText(note)).toBeVisible()),
    ),
  )
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ assay }) =>
        pipe(
          assay,
          OfromNullable,
          Omatch(
            () => {},
            (someAssay) => {
              expect(page.getByText(someAssay)).toBeVisible()
            },
          ),
        ),
      ),
    ),
  )
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ environment }) =>
        pipe(
          environment,
          OfromNullable,
          Omatch(
            () => {},
            (someEnvironment) => {
              expect(page.getByText(someEnvironment)).toBeVisible()
            },
          ),
        ),
      ),
    ),
  )
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ publication }) =>
        expect(page.getByText(publication.title).first()).toBeVisible(),
      ),
    ),
  )
})
