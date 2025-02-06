import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"

const nullableOrElse = <T>(value: T | null | undefined, fallback: T) =>
  pipe(
    value,
    OfromNullable,
    OgetOrElse(() => fallback),
  )

export { nullableOrElse }
