import { test, expect } from "vitest"
import { getPostalCodeWarning } from "../utils/getPostalCodeWarning"

test("Returns comments unchanged if postal code is valid, but there is no warning message in the comments", () => {
  const comments = "This should stay unchanged."
  expect(getPostalCodeWarning("60642", "United States", comments)).toBe(
    comments,
  )
})
