import { test, expect } from "@playwright/test"
import { waitForImageLoad } from "./utils/waitForImageLoad"

test("Header snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const header = page.locator("header")
  await expect(header).toHaveScreenshot()
})

test("Footer snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const footer = page.locator("footer")
  await expect(footer).toHaveScreenshot()
})

test("Navbar snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const navbar = page.locator("nav")
  await expect(navbar).toHaveScreenshot()
})

test("Navbar Item Menu snapshot", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  // Wait for all images to load
  await page.waitForFunction(waitForImageLoad)
  const genomesDropdown = page.getByText("Genomes")
  await genomesDropdown.click()
  const genomesList = page.getByTestId("navbar-dropdown-Genomes")
  await expect(genomesList).toHaveScreenshot()
})
