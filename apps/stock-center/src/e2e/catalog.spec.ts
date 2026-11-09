import { test, expect } from "@playwright/test"

const SEARCH_TERM = "axe"
const CATALOG_PATH = "/stockcenter/catalog"
const STRAINS_PATH = "/stockcenter/strains"
const PLASMIDS_PATH = "/stockcenter/plasmids"

test("Displays initial strain and plasmid items on the full catalog page", async ({
  page,
}) => {
  await page.goto(CATALOG_PATH)

  await expect(
    page.getByRole("heading", { name: "Catalog Search" }),
  ).toBeVisible()
  await expect(page.getByText("[smp3]-").first()).toBeVisible()
  await expect(page.getByText("pDGB_O2_0006").first()).toBeVisible()
})

test("Toggles between list view and table view on the catalog page", async ({
  page,
}) => {
  await page.goto(CATALOG_PATH)
  await expect(page.getByText("[smp3]-").first()).toBeVisible()
  await expect(page.getByRole("table")).not.toBeVisible()

  await page.getByRole("button", { name: /table view/i }).click()
  await expect(page.getByRole("table")).toBeVisible()
  await expect(page.getByRole("link", { name: "[smp3]-" })).toBeVisible()

  await page.getByRole("button", { name: /list view/i }).click()
  await expect(page.getByRole("table")).not.toBeVisible()
})

test("Searches the catalog and syncs the query parameter to the URL", async ({
  page,
}) => {
  await page.goto(CATALOG_PATH)
  const searchInput = page.getByRole("textbox", { name: /search the catalog/i })
  await searchInput.fill(SEARCH_TERM)

  await expect(page).toHaveURL(/\/stockcenter\/catalog\?q=axe/)
  await expect(page.getByText("DBS0236414")).toBeVisible()
})

test("Sidebar entity switcher navigates between catalog, strains, and plasmids", async ({
  page,
}) => {
  await page.goto(CATALOG_PATH)

  await page.getByRole("radio", { name: "Strains", exact: true }).click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\?group=all/)
  await expect(
    page.getByRole("heading", { name: "Strain Catalog" }),
  ).toBeVisible()

  await page.getByRole("radio", { name: "Plasmids", exact: true }).click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\?group=all/)
  await expect(
    page.getByRole("heading", { name: "Plasmid Catalog" }),
  ).toBeVisible()

  await page.getByRole("radio", { name: "All Results" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/catalog/)
})

test("Preserves the active search query when switching entities in the sidebar", async ({
  page,
}) => {
  await page.goto(`${STRAINS_PATH}?q=${SEARCH_TERM}&group=gwdi`)

  await page.getByRole("radio", { name: "Plasmids", exact: true }).click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\?q=axe&group=all/)
})

test("Filters strains by group and navigates to strain details from the strain catalog", async ({
  page,
}) => {
  await page.goto(STRAINS_PATH)
  await expect(
    page.getByRole("heading", { name: "Strain Catalog" }),
  ).toBeVisible()

  await page.getByRole("radio", { name: "Regular Strains" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\?group=regular/)
  const strainTitle = page.getByText(
    "tor(1-476:MTRSLRKVEKLKNSEPTLCTK:479-2380)",
  )
  await expect(strainTitle).toBeVisible()

  await strainTitle.click()
  await expect(page).toHaveURL(/\/stockcenter\/strains\/DBS0351791/)
})

test("Filters plasmids by group and navigates to plasmid details from the plasmid catalog", async ({
  page,
}) => {
  await page.goto(PLASMIDS_PATH)
  await expect(
    page.getByRole("heading", { name: "Plasmid Catalog" }),
  ).toBeVisible()

  await page.getByRole("radio", { name: "Regular Plasmids" }).click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\?group=regular/)
  const plasmidTitle = page.getByText("pUPD2_T2A_TCGGGC_GGCTCG")
  await expect(plasmidTitle).toBeVisible()

  await plasmidTitle.click()
  await expect(page).toHaveURL(/\/stockcenter\/plasmids\/DBP0001102/)
})

test("Adds an available item to the cart from the catalog table view", async ({
  page,
}) => {
  await page.goto(STRAINS_PATH)
  await page.getByRole("button", { name: /table view/i }).click()

  const addButton = page
    .getByRole("button", { name: /add to shopping cart/i })
    .first()
  await expect(addButton).toBeVisible()
  await addButton.click()

  await expect(
    page.getByRole("heading", { name: "Added to Cart" }),
  ).toBeVisible()
})
