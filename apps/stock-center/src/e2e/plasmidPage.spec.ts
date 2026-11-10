import { test, expect } from "@playwright/test"
import { pipe } from "fp-ts/lib/function.js"
import { map as Amap } from "fp-ts/lib/Array.js"
import { plasmidQueryData } from "./utils/gqlRequestData"
import { EXPECTED_PLASMID } from "./utils/expectedData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`
const TEST_PLASMID_ID = "DBP0000027"

test.beforeAll("Test Plasmid Details Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    plasmidQueryData(TEST_PLASMID_ID),
  )
  expect(response.ok()).toBeTruthy()
  expect(await response.json()).toEqual({
    data: { plasmid: EXPECTED_PLASMID },
  })
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/stockcenter/plasmids/${TEST_PLASMID_ID}`)
})

test("Displays Plasmid Details", async ({ page }) => {
  const details = page.locator("main").getByRole("list")
  // Plasmid Descriptor
  await expect(details.getByText(EXPECTED_PLASMID.name)).toBeVisible()
  // Plasmid Summary
  await expect(
    details.getByText(/Plasmid containing a truncated pyr5-6 region/),
  ).toBeVisible()
  // Depositor
  await expect(
    details.getByText(
      `${EXPECTED_PLASMID.depositor.first_name} ${EXPECTED_PLASMID.depositor.last_name}`,
    ),
  ).toBeVisible()
  // Associated Gene(s)
  await Promise.all(
    pipe(
      EXPECTED_PLASMID.genes,
      Amap(({ name }) => expect(details.getByText(name)).toBeVisible()),
    ),
  )
  // Reference(s)
  await Promise.all(
    pipe(
      EXPECTED_PLASMID.publications,
      Amap(({ title }) => expect(details.getByText(title)).toBeVisible()),
    ),
  )
})

test("Copy plasmid ID to clipboard", async ({ page }) => {
  const mainContent = page.locator("main")
  await expect(mainContent.getByTitle("Copy ID to clipboard")).toBeVisible()
})

test("Add to Cart function, return to plasmid details", async ({ page }) => {
  const mainContent = page.locator("main")
  const cartButton = mainContent.getByRole("button", { name: "Add to Cart" })

  await expect(cartButton).toBeVisible()
  await cartButton.click()

  await expect(
    page.getByRole("heading", { name: "Added to Cart" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Continue Shopping" }).click()
  await expect(
    mainContent.getByRole("button", { name: "Remove from Cart" }),
  ).toBeVisible()
})

test("Add to Cart function, go to cart", async ({ page }) => {
  const mainContent = page.locator("main")
  const cartButton = mainContent.getByRole("button", { name: "Add to Cart" })

  await expect(cartButton).toBeVisible()
  await cartButton.click()

  await expect(
    page.getByRole("heading", { name: "Added to Cart" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "View Cart" }).click()
  await expect(
    mainContent.getByRole("heading", { name: "Your Shopping Cart" }),
  ).toBeVisible()
})
