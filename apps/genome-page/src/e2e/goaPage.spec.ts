import { test, expect } from "@playwright/test"

const TEST_GENE = "DDB_G0267382"

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/goannotations`)
})

test("Renders Molecular Function panel", async ({ page }) => {
  await expect(page.getByText("Molecular Function")).toBeVisible()
  await expect(page.getByText("enables protein binding").first()).toBeVisible()
  await expect(page.getByText("IEA").first()).toBeVisible()
  await expect(
    page.getByRole("link", { name: "UniProtKB:P27133" }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "GO_REF:0000033" }).first(),
  ).toBeVisible()
  await expect(page.getByText("2025-09-02").first()).toBeVisible()
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
  await expect(firstMolecularFunctionRow.getByText("2025-09-02")).toBeVisible()
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
