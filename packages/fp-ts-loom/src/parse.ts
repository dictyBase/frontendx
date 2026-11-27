import {
  flatMap as EflatMap,
  fromPredicate as EfromPredicate,
  type Either,
} from "fp-ts/Either"
import { pipe } from "fp-ts/function"
import { trim as Strim } from "fp-ts/string"
import type { LoomError } from "./error"
import { containsMatch } from "./predicate/string"

/**
 * Parse failure. `input` holds the original text.
 */
type ParseError = LoomError<"PARSE_ERROR"> & Readonly<{ input: string }>

const INTEGER_TEXT = /^\s*[+-]?\d+\s*$/
const DECIMAL_TEXT = /^\s*[+-]?(?:\d+\.?\d*|\.\d+)(?:[Ee][+-]?\d+)?\s*$/

const NOT_INTEGER = "not an integer"
const NOT_NUMBER = "not a number"

const parseError =
  (message: string) =>
  (input: string): ParseError => ({ type: "PARSE_ERROR", message, input })

/**
 * Converts validated text to a number, then checks the number with `isValid`.
 * The error keeps the original input text.
 */
const toCheckedNumber =
  (isValid: (value: number) => boolean, message: string) =>
  (input: string): Either<ParseError, number> =>
    pipe(
      input,
      Strim,
      Number,
      EfromPredicate(isValid, () => parseError(message)(input)),
    )

/**
 * Parses a whole integer string. Unlike `Number.parseInt`, partial input such
 * as `"12abc"`, decimals, blank input, and integers outside the safe range
 * (`Number.isSafeInteger`) are `Left`.
 */
const parseInt = (input: string): Either<ParseError, number> =>
  pipe(
    input,
    EfromPredicate(containsMatch(INTEGER_TEXT), parseError(NOT_INTEGER)),
    EflatMap(toCheckedNumber(Number.isSafeInteger, NOT_INTEGER)),
  )

/**
 * Parses a whole decimal string. Partial input, blank input, `"NaN"`, and
 * values that overflow to `Infinity` are `Left`.
 */
const parseFloat = (input: string): Either<ParseError, number> =>
  pipe(
    input,
    EfromPredicate(containsMatch(DECIMAL_TEXT), parseError(NOT_NUMBER)),
    EflatMap(toCheckedNumber(Number.isFinite, NOT_NUMBER)),
  )

export { type ParseError, parseInt, parseFloat }
