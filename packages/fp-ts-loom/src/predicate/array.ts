import { pipe } from "fp-ts/function"
import { contramap as Pcontramap, type Predicate } from "fp-ts/Predicate"
import { size as RAsize } from "fp-ts/ReadonlyArray"
import { atLeast, atMost, numberEq } from "./ord"

/**
 * Array has at least `length` elements. For "not empty", use
 * `ReadonlyArray.isNonEmpty` from fp-ts.
 */
const minLength = <A>(length: number): Predicate<ReadonlyArray<A>> =>
  pipe(atLeast(length), Pcontramap<ReadonlyArray<A>, number>(RAsize))

/**
 * Array has at most `length` elements.
 */
const maxLength = <A>(length: number): Predicate<ReadonlyArray<A>> =>
  pipe(atMost(length), Pcontramap<ReadonlyArray<A>, number>(RAsize))

/**
 * Array has exactly `length` elements.
 */
const lengthEq = <A>(length: number): Predicate<ReadonlyArray<A>> =>
  pipe(numberEq(length), Pcontramap<ReadonlyArray<A>, number>(RAsize))

export { minLength, maxLength, lengthEq }
