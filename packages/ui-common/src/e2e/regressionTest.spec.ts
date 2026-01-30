import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/function"
import { concat as Aconcat, filter as Afilter, map as Amap } from "fp-ts/Array"
import { replace, endsWith } from "fp-ts/string"
import { readdirSync } from "node:fs"
import { join } from "node:path"

const components = readdirSync(join(__dirname, ".."))
const errorComponents = readdirSync(join(__dirname, "../Error"))

const componentPaths = pipe(
  Aconcat(components)(errorComponents),
  Afilter(endsWith(".tsx")),
  Amap(replace(".tsx", "")),
)

componentPaths.forEach((path) => {
  test(`${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
