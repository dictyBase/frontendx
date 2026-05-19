import { pipe } from "fp-ts/function"
import { some, none, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { findFirstMap as AfindFirstMap } from "fp-ts/Array"
import { postcodeValidator } from "postcode-validator"
import { countryList } from "./countryList"

const isValidPostalCode = (postalCode: string, country: string) =>
  pipe(
    countryList,
    AfindFirstMap(({ label, code }) => (label === country ? some(code) : none)),
    Omap((countryCode) => postcodeValidator(postalCode, countryCode)),
    OgetOrElse(() => false),
  )

export { isValidPostalCode }
