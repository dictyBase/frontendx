import { pipe } from "fp-ts/function"
import { MonoidAll as BMonoidAll, match as Bmatch } from "fp-ts/boolean"
import { some, none, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { findFirstMap as AfindFirstMap } from "fp-ts/Array"
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator"
import { countryList } from "./countryList"

const isValidPostalCode = (postalCode: string, country: string) =>
  pipe(
    countryList,
    AfindFirstMap(({ label, code }) =>
      pipe(
        // If there is a corresponding country code for `country` in `countryList`,
        BMonoidAll.concat(
          label === country,
          // ...and a validator exists for that country code,
          postcodeValidatorExistsForCountry(code),
        ),
        // Return that country code.
        Bmatch(
          () => none,
          () => some(code),
        ),
      ),
    ),
    // The country code is then validated against the postal code.
    Omap((countryCode) => postcodeValidator(postalCode, countryCode)),
    // If there wasn't a valiadator or a matching code in our `countryList`, the input should be considered valid.
    OgetOrElse(() => true),
  )

export { isValidPostalCode }
