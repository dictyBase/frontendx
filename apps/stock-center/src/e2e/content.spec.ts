import { pipe } from "fp-ts/lib/function.js"
import { flatten as Aflatten, map as Amap } from "fp-ts/lib/Array.js"
import { test, expect } from "@playwright/test"

const contentRoutes = [
  {
    name: "Dicty Stock Center",
    pages: ["Ordering", "Depositing Materials", "Payment Information", "FAQ"],
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
      await page.getByRole("navigation").filter({ hasText: group }).hover()
      await page
        .getByRole("tooltip")
        .getByRole("link", { name: pageName })
        .click()
      const editor = page.locator("[data-lexical-editor]")
      await expect(editor).toBeAttached()
    })
  }),
)

test("Redirects unauthenticated user from /information/order to /information/order/show", async ({
  page,
}) => {
  await page.goto("/stockcenter/information/order")
  await expect(page).toHaveURL(/\/stockcenter\/information\/order\/show/)
  await expect(page.locator("[data-lexical-editor]")).toBeAttached()
})

test("Standard Operating Procedures page renders embedded PDF viewer and download link", async ({
  page,
}) => {
  await page.goto("/stockcenter")
  await page
    .getByRole("navigation")
    .filter({ hasText: "Dicty Stock Center" })
    .hover()
  await page
    .getByRole("tooltip")
    .getByRole("link", { name: "Standard Operating Procedures" })
    .click()

  await expect(page).toHaveURL(/\/stockcenter\/information\/sop\/show/)
  await expect(
    page.getByRole("heading", { name: "Standard Operating Procedures" }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: /download pdf/i }),
  ).toHaveAttribute("download", "DSC_SOP_OIM_Aug22.pdf")
})
