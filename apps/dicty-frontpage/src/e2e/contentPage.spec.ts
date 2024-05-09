import { test, expect } from "@playwright/test"

const contentRoutes = [
  {
    name: "Explore",
    pages: [
      "Dicty Art",
      "Gallery",
      "Learn About Dicty",
      "Teaching Protocols",
      "Useful Links",
    ],
  },
  {
    name: "Research",
    pages: [
      "Techniques",
      "Anatomy Ontology",
      "Codon Bias Table",
      "Nomenclature Guidelines",
      "Phenotyping",
      "Axenic Strain History",
    ],
  },
  {
    name: "Community",
    pages: [
      "Cite Us",
      "Dicty Annual Conferences",
      "Dicty Email Forum",
      "Dicty Labs",
      "History",
      "Jobs",
      "Community Annotations",
    ],
  },
]

const BASE_URL = process.env.FRONTPAGE_URL || "http://localhost:3004"

for (const group of contentRoutes) {
  for (const pageName of group.pages) {
    test(`${pageName} page is properly rendered`, async ({ page }) => {
      await page.goto(BASE_URL)
      await page
        .getByRole("navigation")
        .getByText(group.name, { exact: true })
        .click()
      await page
        .getByRole("navigation")
        .getByRole("link", { name: pageName, exact: true })
        .click()
      const editor = page.locator("[data-lexical-editor]")
      await expect(editor).toBeAttached()
    })
  }
}
