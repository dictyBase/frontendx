import { pipe } from "fp-ts/function"
import { between, geq, leq, lt } from "fp-ts/Ord"
import {
  and as Pand,
  contramap as Pcontramap,
  not as Pnot,
  type Predicate,
} from "fp-ts/Predicate"
import { Eq as NEq, Ord as NOrd } from "fp-ts/number"
import { Eq as SEq, size as Ssize } from "fp-ts/string"

/**
 * `Predicate<number>` that holds when the value is a whole number.
 */
const { isInteger } = Number

/**
 * `Predicate<number>` that holds when the value is greater than or equal to `low`.
 */
const atLeast = (low: number): Predicate<number> => {
  const isAtLeast: Predicate<number> = (value) => geq(NOrd)(value, low)
  return isAtLeast
}

/**
 * `Predicate<number>` that holds when the value is less than `high`.
 */
const below = (high: number): Predicate<number> => {
  const isBelow: Predicate<number> = (value) => lt(NOrd)(value, high)
  return isBelow
}

/**
 * `Predicate<number>` that holds when the value is less than or equal to `high`.
 */
const atMost = (high: number): Predicate<number> => {
  const isAtMost: Predicate<number> = (value) => leq(NOrd)(value, high)
  return isAtMost
}

/**
 * `Predicate<number>` that holds when the value equals `expected`.
 */
const numberEq = (expected: number): Predicate<number> => {
  const equalsNumber: Predicate<number> = (value) => NEq.equals(value, expected)
  return equalsNumber
}

/**
 * Integer in `[low, high)`: the lower end is included, the upper end is excluded.
 * Same meaning as fp-go-loom `predord.IntBetween`.
 */
const intBetween = (low: number, high: number): Predicate<number> =>
  pipe(isInteger, Pand(atLeast(low)), Pand(below(high)))

/**
 * Integer in `[low, high]`: both ends are included.
 */
const intBetweenInclusive = (low: number, high: number): Predicate<number> =>
  pipe(isInteger, Pand(between(NOrd)(low, high)))

/**
 * String length (UTF-16 code units) is at least `length`.
 */
const minStringLength = (length: number): Predicate<string> =>
  pipe(atLeast(length), Pcontramap(Ssize))

/**
 * String length (UTF-16 code units) is at most `length`.
 */
const maxStringLength = (length: number): Predicate<string> =>
  pipe(atMost(length), Pcontramap(Ssize))

/**
 * String length (UTF-16 code units) is exactly `length`.
 */
const stringLengthEq = (length: number): Predicate<string> =>
  pipe(numberEq(length), Pcontramap(Ssize))

/**
 * String equals `expected`.
 */
const stringEq = (expected: string): Predicate<string> => {
  const equalsString: Predicate<string> = (value) => SEq.equals(value, expected)
  return equalsString
}

/**
 * String does not equal `excluded`.
 */
const notEqualString = (excluded: string): Predicate<string> =>
  pipe(stringEq(excluded), Pnot)

/**
 * Number does not equal `excluded`.
 */
const notEqualNumber = (excluded: number): Predicate<number> =>
  pipe(numberEq(excluded), Pnot)

export {
  atLeast,
  atMost,
  below,
  numberEq,
  intBetween,
  intBetweenInclusive,
  minStringLength,
  maxStringLength,
  stringLengthEq,
  stringEq,
  notEqualString,
  notEqualNumber,
}
