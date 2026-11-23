import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { Eq as SEq } from "fp-ts/lib/string.js"
import { map as Amap, uniq as Auniq } from "fp-ts/lib/Array.js"
import { EXPECTED_COR_A_STRAIN } from "./utils/expectedData"

const TEST_GENE = "DDB_G0267382"

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
      EXPECTED_COR_A_STRAIN.phenotypes,
      Amap(({ phenotype }) =>
        page.getByRole("row", { name: new RegExp(phenotype) }),
      ),
      Amap((row) => expect(row.first()).toBeVisible()),
    ),
  )
})

test("Displays phenotype characteristics", async ({ page }) => {
  const expectedRow = page.getByRole("row", { name: EXPECTED_COR_A_STRAIN.id })
  await expect(expectedRow).toBeVisible()
  await Promise.all(
    pipe(
      EXPECTED_COR_A_STRAIN.characteristics,
      Amap((characteristic) =>
        expect(expectedRow).toHaveText(new RegExp(characteristic)),
      ),
    ),
  )
})

test("Displays phenotype references", async ({ page }) => {
  await Promise.all(
    pipe(
      EXPECTED_COR_A_STRAIN.phenotypes,
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
