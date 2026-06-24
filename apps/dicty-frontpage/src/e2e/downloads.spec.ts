import { test, expect } from "@playwright/test"

test("Renders downloads page", async ({ page }) => {
  await page.goto("/downloads")
  const editor = page.locator("[data-lexical-editor]")
  await expect(editor).toBeAttached()
})
