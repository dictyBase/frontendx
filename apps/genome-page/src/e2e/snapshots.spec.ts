import { test, expect } from "@playwright/test"
import { waitForImageLoad } from "./utils/waitForImageLoad"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
})

test("Header snapshot", async ({ page }) => {
  const header = page.locator("header")
  await expect(header).toHaveScreenshot()
})

test("Footer snapshot", async ({ page }) => {
  const footer = page.locator("footer")
  await expect(footer).toHaveScreenshot()
})

test("Navbar snapshot", async ({ page }) => {
  const navbar = page.locator("nav")
  await expect(navbar).toHaveScreenshot()
})

test("Navbar Item Menu snapshot", async ({ page }) => {
  const genomesDropdown = page.getByText("Genomes")
  await genomesDropdown.click()
  const genomesList = page.getByTestId("navbar-dropdown-Genomes")
  await expect(genomesList).toHaveScreenshot()
})
