import { string, StringSchema } from "yup"
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import parsePhoneNumberFromString, { type CountryCode } from "libphonenumber-js"

const MAX_INPUT_LENGTH = 70

const curriedParsePhoneNumberFromString =
  (
    defaultCountryCode:
      | CountryCode
      | {
          defaultCountry?: CountryCode | undefined
          defaultCallingCode?: string | undefined
          extract?: boolean | undefined
        }
      | undefined,
  ) =>
  (text: string) =>
    parsePhoneNumberFromString(text, defaultCountryCode)

const commonOrderFields: { [k: string]: StringSchema } = {
  firstName: string()
    .required("* First name is required")
    .max(MAX_INPUT_LENGTH),
  lastName: string().required("* Last name is required").max(MAX_INPUT_LENGTH),
  email: string().email().required("* Email is required").max(MAX_INPUT_LENGTH),
  organization: string()
    .required("* Organization is required")
    .max(MAX_INPUT_LENGTH),
  lab: string().required("* Lab/Group is required").max(MAX_INPUT_LENGTH),
  address1: string().required("* Address is required").max(MAX_INPUT_LENGTH),
  city: string().required("* City is required").max(MAX_INPUT_LENGTH),
  zip: string()
    .required("* Zip code is required")
    .matches(/^\d+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  country: string().required("* Country is required"),
  countryCode: string().required(),
  phone: string()
    .required("* Phone number is required")
    .when(["countryCode"], ([countryCode], schema) =>
      schema.test("phone-number", "Invalid Phone Number", (phone) =>
        pipe(
          phone,
          curriedParsePhoneNumberFromString(countryCode),
          OfromNullable,
          Omatch(
            () => false,
            (parsedPhone) => parsedPhone.isValid(),
          ),
        ),
      ),
    ),
}

export { commonOrderFields }
