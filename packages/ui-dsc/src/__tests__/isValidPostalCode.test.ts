import { expect, test } from "vitest"
import { pipe } from "fp-ts/function"
import { some as Asome, findFirst as AfindFirst } from "fp-ts/Array"
import { map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { postcodeValidatorExistsForCountry } from "postcode-validator"
import { isValidPostalCode } from "../utils/isValidPostalCode"
import { countryList } from "../utils/countryList"

test("A country not in our `countryList` should pass validation", () => {
  expect(
    pipe(
      countryList,
      Asome(({ label }) => label === "Karhide"),
    ),
  ).toBeFalsy()
  expect(isValidPostalCode("", "Karhide")).toBeTruthy()
})

test("A country that does not have a validator from `postcode-validator` should pass validation", () => {
  const testCountryLabel = "Uganda"
  const testCountryCode = "UG"
  // Label `Uganda` have corresponding code `UG`.
  expect(
    pipe(
      countryList,
      AfindFirst(({ label }) => label === testCountryLabel),
      Omap(({ code }) => code === testCountryCode),
      OgetOrElse(() => false),
    ),
  ).toBeTruthy()

  // Code `UG` should not have a validator in `postcode-validator`.
  expect(postcodeValidatorExistsForCountry(testCountryCode)).toBeFalsy()

  // Label `Uganda should pass postal code validation with any postal code.
  expect(isValidPostalCode("", testCountryLabel)).toBeTruthy()
})
