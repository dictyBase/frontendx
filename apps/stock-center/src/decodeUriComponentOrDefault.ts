import { pipe } from "fp-ts/function"
import { tryCatch, getOrElse as EgetOrElse } from "fp-ts/Either"
import {
  fromPredicate as OfromPredicate,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"

const eitherDecodeUriComponent = (uriComponent: string) =>
  pipe(
    tryCatch(
      () => decodeURIComponent(uriComponent),
      (unknownError) =>
        pipe(
          unknownError,
          OfromPredicate((error) => error instanceof URIError),
          OgetOrElse(() => new Error("unknown error")),
        ),
    ),
  )

const decodeUriComponentOrDefault = (uriComponent: string) =>
  pipe(
    uriComponent,
    eitherDecodeUriComponent,
    EgetOrElse(() => uriComponent),
  )

export { decodeUriComponentOrDefault }
