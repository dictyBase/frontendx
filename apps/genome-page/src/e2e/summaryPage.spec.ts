import { test, expect } from "@playwright/test"
import { EXPECTED_GENERAL_INFO } from "./utils/expectedData"

const TEST_GENE = "DDB_G0269114"

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
