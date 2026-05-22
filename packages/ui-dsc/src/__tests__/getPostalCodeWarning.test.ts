import { test, expect } from "vitest"
import { getPostalCodeWarning } from "../utils/getPostalCodeWarning"
import { INVALID_POSTAL_CODE_MESSAGE } from "../const"

test("Returns comments unchanged if postal code is invalid, already a warning message in the comments", () => {
  expect(
    getPostalCodeWarning("ABCD", "United States", INVALID_POSTAL_CODE_MESSAGE),
  ).toBe(INVALID_POSTAL_CODE_MESSAGE)
})
