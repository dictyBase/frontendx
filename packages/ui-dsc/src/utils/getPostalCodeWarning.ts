/* eslint-disable @typescript-eslint/no-shadow */
import { pipe } from "fp-ts/function"
import { MonoidAny as BMonoidAny, MonoidAll as BMonoidAll } from "fp-ts/boolean"
import {
  isEmpty as SisEmpty,
  replace as Sreplace,
  includes as Sincludes,
  trim as Strim,
} from "fp-ts/string"
import { match } from "ts-pattern"
import { appendWithNewline } from "./appendWithNewline"
import { isValidPostalCode } from "./isValidPostalCode"
import { INVALID_POSTAL_CODE_MESSAGE } from "../const"

const getPostalCodeWarning = (
  postalCode: string,
  country: string,
  comments: string,
) => {
  const validPostalCode = isValidPostalCode(postalCode, country)
  return (
    match({ validPostalCode, comments })
      // Return comments with invalid postal code warning removed, if there is no postal code number entered or if the postal code number is valid.
      .when(
        ({ validPostalCode }) =>
          BMonoidAny.concat(validPostalCode, SisEmpty(postalCode)),
        () => pipe(comments, Sreplace(INVALID_POSTAL_CODE_MESSAGE, ""), Strim),
      )
      // Return comments with the invalid postal code warning appended, if the entered postal code number is invalid and there is currently no invalid postal code number warning in the comments.
      .when(
        ({ comments, validPostalCode }) =>
          BMonoidAll.concat(
            !pipe(comments, Sincludes(INVALID_POSTAL_CODE_MESSAGE)),
            !validPostalCode,
          ),
        () => appendWithNewline(comments, INVALID_POSTAL_CODE_MESSAGE),
      )
      .otherwise(() => comments)
  )
}

export { getPostalCodeWarning }
