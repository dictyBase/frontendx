import { test, expect } from "@playwright/test"

test("The base route redirects unauthorized users to ./show", async ({
  page,
}) => {
  await page.goto("/news")
  await expect(page).toHaveURL("/news/show")
})

test("Renders News Heading", async ({ page }) => {
  await page.goto("/news")
  await expect(
    page.getByRole("heading", { name: "Dicty Community Resource News" }),
  ).toBeVisible()
})

test("Renders at least 1 news item that links to a single news page", async ({
  page,
}) => {
  await page.goto("/news")
  const newsLink = page.getByRole("main").getByRole("link").nth(0)
  await expect(newsLink).toBeVisible()
  await newsLink.click()
  await expect(page).toHaveURL(/^.*\/news\/[\w-]+\/(show|editable)$/)
})
