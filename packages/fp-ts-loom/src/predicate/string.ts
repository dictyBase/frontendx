import { pipe } from "fp-ts/function"
import { between } from "fp-ts/Ord"
import { contramap as Pcontramap, type Predicate } from "fp-ts/Predicate"
import { Ord as NOrd } from "fp-ts/number"
import { size as Ssize } from "fp-ts/string"
import { notEqualNumber } from "./ord"

/**
 * String contains a match for `pattern`. Uses `String.search`, so the `g` and
 * `y` flags do not carry state between calls.
 * Same role as fp-go-loom `predstrings.ContainsRuneClass`.
 */
const containsMatch = (pattern: RegExp): Predicate<string> =>
  pipe(
    notEqualNumber(-1),
    Pcontramap((value: string) => value.search(pattern)),
  )

/**
 * String length (UTF-16 code units) is in `[low, high]`, both ends included.
 */
const stringLengthBetween = (low: number, high: number): Predicate<string> =>
  pipe(between(NOrd)(low, high), Pcontramap(Ssize))

export { containsMatch, stringLengthBetween }
