import { test, expect } from "@playwright/test"

test("Renders downloads page", async ({ page }) => {
  await page.goto("/downloads")
  await expect(
    page.getByRole("columnheader", { name: "Gene Information" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Dictyostelium Sequences and" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Genes on AX3/AX4 Chromosome 2" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Protein Information" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Gene Ontology File" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Dicty Stock Center Data" }),
  ).toBeVisible()
  await expect(
    page.getByRole("columnheader", { name: "Dictyostelium Anatomy Ontology" }),
  ).toBeVisible()
})
