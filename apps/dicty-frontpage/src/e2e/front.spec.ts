import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/dictyBase/)
})

test("Dicty News component is displayed", async ({ page }) => {
  await page.goto("/")
  const dictyNewsTitle = page.getByText("DCR News")
  await expect(page).toHaveTitle(/dictyBase/)
  await expect(dictyNewsTitle).toBeInViewport()
})

test("Dicty News renders link to /news", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "More News" }).click()
  await expect(page).toHaveURL(/^.*\/news(\/(show|editable))?$/)
})

test("Latest Papers renders link to /papers", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "More Papers" }).click()
  await expect(page).toHaveURL(/^.*\/papers$/)
})
