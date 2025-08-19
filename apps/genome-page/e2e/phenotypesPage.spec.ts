/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/function"
import { Eq as SEq } from "fp-ts/string"
import { map as Amap, uniq as Auniq } from "fp-ts/Array"
import { ListStrainsWithGeneQueryResult } from "dicty-graphql-schema"
import { listStrainsWithGeneQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`

const TEST_GENE = "DDB_G0267382"

const EXPECTED_STRAIN = {
  id: "DBS0236174",
  label: "corA-",
  characteristics: [
    "null mutant",
    "axenic",
    "drug resistant",
    "neomycin resistant",
  ],
  in_stock: true,
  phenotypes: [
    {
      phenotype: "increased myosin II assembly",
      publication: {
        id: "24347642",
        title:
          "A Cdc42- and Rac-interactive binding (CRIB) domain mediates functions of coronin.",
        journal:
          "Proceedings of the National Academy of Sciences of the United States of America",
        pages: "E25-33",
        volume: "111",
        pub_date: "2013-12-17T00:00:00.000Z",
        authors: [
          { last_name: "Swaminathan", rank: "0" },
          { last_name: "Müller-Taubenberger", rank: "1" },
          { last_name: "Faix", rank: "2" },
          { last_name: "Rivero", rank: "3" },
          { last_name: "Noegel", rank: "4" },
        ],
      },
    },
    {
      phenotype: "decreased growth rate",
      publication: {
        id: "8380174",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        journal: "The Journal of cell biology",
        pages: "163-173",
        volume: "120",
        pub_date: "1993-01-01T00:00:00.000Z",
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
      },
    },
    {
      phenotype: "decreased cell motility",
      publication: {
        id: "8380174",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        journal: "The Journal of cell biology",
        pages: "163-173",
        volume: "120",
        pub_date: "1993-01-01T00:00:00.000Z",
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
      },
    },
    {
      phenotype: "aberrant cytokinesis",
      publication: {
        id: "8380174",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        journal: "The Journal of cell biology",
        pages: "163-173",
        volume: "120",
        pub_date: "1993-01-01T00:00:00.000Z",
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
      },
    },
  ],
}

test.beforeAll(
  "Test Gene Ontology Annotation Page API",
  async ({ playwright }) => {
    const apiContext = await playwright.request.newContext()

    const goa = await apiContext.post(
      GRAPHQL_ENDPOINT,
      listStrainsWithGeneQueryData(TEST_GENE),
    )
    const { data: strainsWithGeneData }: ListStrainsWithGeneQueryResult =
      await goa.json()

    expect(goa.ok()).toBeTruthy()

    expect(strainsWithGeneData?.listStrainsWithGene).toContainEqual(
      expect.objectContaining(EXPECTED_STRAIN),
    )
  },
)

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/phenotypes`)
})

test("Displays all strains with phenotypes", async ({ page }) => {
  const tableBody = page.locator("tbody")
  const firstStrain = tableBody.getByRole("row", {
    name: "DBS0236172",
  })
  const secondStrain = tableBody.getByRole("row", {
    name: "DBS0236173",
  })
  const thirdStrain = tableBody.getByRole("row", {
    name: "DBS0236173",
  })
  const strainName = "corA-"
  await expect(firstStrain).toBeVisible()
  await expect(secondStrain).toBeVisible()
  await expect(thirdStrain).toBeVisible()

  await expect(
    firstStrain.getByRole("link", { name: strainName }),
  ).toBeVisible()
  await expect(
    secondStrain.getByRole("link", { name: strainName }),
  ).toBeVisible()
  await expect(
    thirdStrain.getByRole("link", { name: strainName }),
  ).toBeVisible()
})

test("Displays all phenotypes of a strain", async ({ page }) => {
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ phenotype }) =>
        page.getByRole("row", { name: new RegExp(phenotype) }),
      ),
      Amap((row) => expect(row.first()).toBeVisible()),
    ),
  )
})

test("Displays phenotype characteristics", async ({ page }) => {
  const expectedRow = page.getByRole("row", { name: EXPECTED_STRAIN.id })
  await expect(expectedRow).toBeVisible()
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.characteristics,
      Amap((characteristic) =>
        expect(expectedRow).toHaveText(new RegExp(characteristic)),
      ),
    ),
  )
})

test("Displays phenotype references", async ({ page }) => {
  await Promise.all(
    pipe(
      EXPECTED_STRAIN.phenotypes,
      Amap(({ publication: { title } }) => title),
      Auniq(SEq),
      Amap((title) =>
        expect(page.getByRole("row", { name: title }).first()).toBeVisible(),
      ),
    ),
  )
})

test("Does not display strains that do not have phenotypes", async ({
  page,
}) => {
  await expect(
    page.getByRole("row", {
      name: "DBS0236171",
    }),
  ).not.toBeVisible()
})
