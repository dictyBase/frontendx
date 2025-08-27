import { pipe } from "fp-ts/lib/function.js"
import { flatten as Aflatten, map as Amap } from "fp-ts/lib/Array.js"
import { test, expect } from "@playwright/test"

const contentRoutes = [
  {
    name: "Dicty Stock Center",
    pages: [
      "Order Information",
      "Deposit Information",
      "Payment Information",
      "FAQ",
    ],
  },
]

const toRouteObject = ({
  name,
  pages,
}: {
  name: string
  pages: Array<string>
}) =>
  pipe(
    pages,
    Amap((pageName) => ({ group: name, pageName })),
  )

const pages = pipe(
  contentRoutes,
  Amap((element) => toRouteObject(element)),
  Aflatten,
)

pipe(
  pages,
  Amap(({ group, pageName }) => {
    test(`${pageName} page is properly rendered`, async ({ page }) => {
      await page.goto("/stockcenter")
      await page
        .getByRole("navigation")
        .getByText(group, { exact: true })
        .click()
      await page
        .getByRole("navigation")
        .getByRole("link", { name: pageName, exact: true })
        .click()
      const editor = page.locator("[data-lexical-editor]")
      await expect(editor).toBeAttached()
    })
  }),
)
