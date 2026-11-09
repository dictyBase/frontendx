import { test, expect } from "@playwright/test"

const PHENOTYPES_PATH = "/stockcenter/phenotypes"
const TEST_PHENOTYPE = "decreased cAMP level"
const ENCODED_PHENOTYPE_PATH = "/stockcenter/phenotypes/decreased+cAMP+level"

test("Displays empty search prompt on the phenotype search index page", async ({
  page,
}) => {
  await page.goto(PHENOTYPES_PATH)

  await expect(page.getByLabel("Phenotype")).toBeVisible()
  await expect(
    page.getByText("Enter a phenotype above to search for strains"),
  ).toBeVisible()
})

test("Searching for a phenotype navigates to the phenotype results route", async ({
  page,
}) => {
  await page.goto(PHENOTYPES_PATH)

  const phenotypeInput = page.getByLabel("Phenotype")
  await phenotypeInput.fill(TEST_PHENOTYPE)
  await page.getByRole("button", { name: "Search", exact: true }).click()

  await expect(page).toHaveURL(
    /\/stockcenter\/phenotypes\/decreased\+cAMP\+level/,
  )
})

test("Displays annotated strains for a phenotype and navigates to strain details", async ({
  page,
}) => {
  await page.goto(ENCODED_PHENOTYPE_PATH)

  await expect(
    page.getByRole("heading", { name: TEST_PHENOTYPE }),
  ).toBeVisible()
  const strainLink = page.getByRole("link", { name: "krsA-" })
  await expect(strainLink).toBeVisible()
  await expect(page.getByText("DDB_G0269364").first()).toBeVisible()

  await strainLink.click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\/DBS0238720/)
})
