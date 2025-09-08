import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import parsePhoneNumber, { type CountryCode } from "libphonenumber-js"

const curriedParsePhoneNumberFromString =
  (
    defaultCountryCode:
      | CountryCode
      | {
          defaultCountry?: CountryCode
          defaultCallingCode?: string
          extract?: boolean
        }
      | undefined,
  ) =>
  (text: string) =>
    parsePhoneNumber(text, defaultCountryCode)

const isPhoneValid = (phone: string, countryCode: CountryCode) =>
  pipe(
    phone,
    curriedParsePhoneNumberFromString(countryCode),
    OfromNullable,
    Omatch(
      () => false,
      (parsedPhone) => parsedPhone.isValid(),
    ),
  )

export { curriedParsePhoneNumberFromString, isPhoneValid }
