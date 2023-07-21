import { test } from "vitest"
import { countryToFlag } from "../order/CountryDropdown"

describe("OrderForm/countryToFlag", () => {
  test("should return expected string", () => {
    expect(countryToFlag("IS")).toBe("🇮🇸")
  })
  test("should return isoCode if String.fromCodePoint is invalid", () => {
    // @ts-ignore
    global.String.fromCodePoint = undefined
    expect(countryToFlag("IS")).toBe("IS")
  })
})
