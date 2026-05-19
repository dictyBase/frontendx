import { pipe } from "fp-ts/function"
import { MonoidAll as BMonoidAll } from "fp-ts/boolean"
import {
  some,
  none,
  map as Omap,
  getOrElse as OgetOrElse,
  fromPredicate as OfromPredicate,
} from "fp-ts/Option"
import { findFirstMap as AfindFirstMap } from "fp-ts/Array"
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator"
import { countryList } from "./countryList"

const isValidPostalCode = (postalCode: string, country: string) =>
  pipe(
    countryList,
    AfindFirstMap(({ label, code }) => (label === country ? some(code) : none)),
    Omap((countryCode) => postcodeValidator(postalCode, countryCode)),
    OgetOrElse(() => true),
  )

export { isValidPostalCode }
