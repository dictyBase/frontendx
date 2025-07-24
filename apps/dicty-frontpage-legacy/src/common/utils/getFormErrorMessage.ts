import { FieldError } from "react-hook-form"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"

const getFormErrorMessage = (error: FieldError | undefined) =>
  pipe(
    error,
    OfromNullable,
    OflatMap(({ message }) => OfromNullable(message)),
    OgetOrElse(() => ""),
  )

export { getFormErrorMessage }
