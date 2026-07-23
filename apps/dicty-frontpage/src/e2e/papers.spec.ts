import { test, expect } from "@playwright/test"
import { mockPubMedFetch } from "./utils"

const selectedAttribute = "aria-selected"

test.beforeEach(async ({ page }) => {
  await mockPubMedFetch(page)
  await page.goto("papers")
})

test("Navigates to papers page and displays the heading", async ({ page }) => {
  const heading = page.getByRole("heading", { name: /Latest Publications/ })
  await expect(heading).toBeInViewport()
})

test("Displays paper cards with titles", async ({ page }) => {
  const cards = page.locator('[class*="MuiCard"]')
  await expect(cards).toHaveCount(3)
  await expect(page.getByText(/Stress, Sex, Cysts and Spores/)).toBeVisible()
  await expect(page.getByText(/Collective surfing/)).toBeVisible()
  await expect(page.getByText(/IqgD is a Rac1/)).toBeVisible()
})

test("Displays journal, date, and PMID for each paper", async ({ page }) => {
  await expect(
    page.getByText(/Published in Integrative and comparative biology/),
  ).toBeVisible()
  await expect(page.getByText("PMID: 42476553")).toBeVisible()
  await expect(page.getByText(/Published in Scientific reports/)).toBeVisible()
  await expect(page.getByText("PMID: 42471391")).toBeVisible()
  await expect(
    page.getByText(/Published in Cell communication and signaling/),
  ).toBeVisible()
  await expect(page.getByText("PMID: 42458551")).toBeVisible()
})

test("Displays author chips for each paper", async ({ page }) => {
  await expect(page.getByText("GWA Constable")).toBeVisible()
  await expect(page.getByText("X Liu")).toBeVisible()
  await expect(page.getByText("S Sattari")).toBeVisible()
  await expect(page.getByText("S Sawai")).toBeVisible()
})

test("Displays abstract section for each paper", async ({ page }) => {
  const abstracts = page.getByText("Abstract")
  await expect(abstracts).toHaveCount(3)
  await expect(page.getByText(/In facultatively sexual species/)).toBeVisible()
  await expect(
    page.getByText(/Wavelike motion mediated by chemotactic signaling/),
  ).toBeVisible()
  await expect(
    page.getByText(/Phagocytosis of surface-bound microbes/),
  ).toBeVisible()
})

test("Sort tabs are rendered and switchable", async ({ page }) => {
  const newestTab = page.getByRole("tab", { name: "Newest First" })
  const oldestTab = page.getByRole("tab", { name: "Oldest First" })
  const titleATab = page.getByRole("tab", { name: "Title (A - Z)" })

  await expect(newestTab).toBeVisible()
  await expect(oldestTab).toBeVisible()
  await expect(titleATab).toBeVisible()

  await expect(newestTab).toHaveAttribute(selectedAttribute, "true")

  await oldestTab.click()
  await expect(oldestTab).toHaveAttribute(selectedAttribute, "true")
  await expect(newestTab).toHaveAttribute(selectedAttribute, "false")
})
