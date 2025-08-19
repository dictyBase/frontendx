import { test, expect } from "@playwright/test"
import { strainQueryData } from "./utils/gqlRequestData"
import { EXPECTED_STRAIN } from "./utils/expectedData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_APP_GRAPHQL_SERVER}/graphql`
const TEST_STRAIN_ID = "DBS0350877"

test.beforeAll("Test Reference Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()
  const response = await apiContext.post(
    GRAPHQL_ENDPOINT,
    strainQueryData(TEST_STRAIN_ID),
  )
  expect(response.ok()).toBeTruthy()
  expect(await response.json()).toEqual({
    data: { strain: EXPECTED_STRAIN },
  })
})

test("", () => {})
