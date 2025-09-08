import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import parsePhone, { type CountryCode } from "libphonenumber-js"

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
    parsePhone(text, defaultCountryCode)

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
