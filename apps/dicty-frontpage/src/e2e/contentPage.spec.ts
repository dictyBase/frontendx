import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { test, expect } from "@playwright/test"

const contentRoutes = [
  {
    tab: "Explore",
    links: [
      "Dicty Art",
      "Gallery",
      "Learn About Dicty",
      "Teaching Protocol",
      "Useful Links",
    ],
  },
  {
    tab: "Research",
    links: [
      "Techniques",
      "Anatomy Ontology",
      "Codon Bias Table",
      "Nomenclature Guidelines",
      "Phenotyping",
      "Axenic Strain History",
    ],
  },
  {
    tab: "Community",
    links: [
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

for (const dropdown of contentRoutes) {
  for (const pageName of dropdown.links) {
    test(`${pageName} page is properly rendered`, async ({ page }) => {
      await page.goto("http://localhost:3004/")
      await page
        .getByRole("navigation")
        .getByText(dropdown.tab, { exact: true })
        .click()
      await page
        .getByRole("navigation")
        .getByRole("link", { name: pageName })
        .click()
      const editor = page.locator("[data-lexical-editor]")
      await expect(editor).toBeAttached()
    })
  }
}
//  const editor = page.locator("[data-lexical-editor]")
//  await expect(editor).toBeAttached()
