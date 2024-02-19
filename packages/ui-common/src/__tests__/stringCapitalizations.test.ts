import { test, expect } from "vitest"
import { capitalizeEveryWordInString } from "../stringCapitalizations"

describe("capitalizeEveryWordInString", () => {
  test("should capitalize every word", () => {
    expect(capitalizeEveryWordInString("other stock centers")).toEqual(
      "Other Stock Centers",
    )
  })
})
