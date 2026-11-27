import { constant, flow, pipe } from "fp-ts/function"
import {
  fromPredicate as OfromPredicate,
  getOrElse as OgetOrElse,
  map as Omap,
  some as Osome,
  type Option,
} from "fp-ts/Option"
import type { Predicate } from "fp-ts/Predicate"
import { findFirstMap as RAfindFirstMap } from "fp-ts/ReadonlyArray"

/**
 * One match arm: `Some(result)` when the arm applies, `None` otherwise.
 */
type Case<A, B> = (value: A) => Option<B>

/**
 * Arm that applies `f` when `predicate` holds. Same role as fp-go-loom `MO.Case`.
 */
const matchCase = <A, B>(
  predicate: Predicate<A>,
  f: (value: A) => B,
): Case<A, B> => flow(OfromPredicate(predicate), Omap(f))

/**
 * Arm that yields `result` when `predicate` holds. Same role as fp-go-loom `MO.Const`.
 */
const matchConst = <A, B>(predicate: Predicate<A>, result: B): Case<A, B> =>
  matchCase(predicate, constant(result))

/**
 * Arm that always applies. Same role as fp-go-loom `MO.Default`.
 */
const matchDefault = <A, B>(f: (value: A) => B): Case<A, B> => flow(f, Osome)

/**
 * Lazy first-match-wins dispatch. Arms run in order and stop at the first
 * `Some`. Later arms do not run. Returns `fallback` when no arm applies.
 * Same role as fp-go-loom `MO.Match`.
 */
type Matcher<A, B> = (value: A) => B

const match = <A, B>(
  fallback: B,
  cases: ReadonlyArray<Case<A, B>>,
): Matcher<A, B> => {
  const runMatch: Matcher<A, B> = (value) =>
    pipe(
      cases,
      RAfindFirstMap((arm) => arm(value)),
      OgetOrElse(constant(fallback)),
    )
  return runMatch
}

export { type Case, matchCase, matchConst, matchDefault, match }
