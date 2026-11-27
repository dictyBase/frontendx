import type { ReactNode } from "react"
import { getMonoid as EgetMonoid, type Endomorphism } from "fp-ts/Endomorphism"
import { pipe } from "fp-ts/function"
import {
  concatAll as MconcatAll,
  reverse as Mreverse,
  type Monoid,
} from "fp-ts/Monoid"
import { fromPredicate as OfromPredicate, match as Omatch } from "fp-ts/Option"
import type { Predicate } from "fp-ts/Predicate"
import type { Reader } from "fp-ts/Reader"
import { flap as RAflap } from "fp-ts/ReadonlyArray"

/**
 * Vertical React wrapper `(node: ReactNode) => ReactNode`.
 */
type Wrapper = Endomorphism<ReactNode>

/**
 * `Monoid` for `Wrapper` (`Endomorphism<ReactNode>`) in inner-to-outer pipeline order:
 * `MonoidWrapper.concat(inner, outer)(node)` evaluates `outer(inner(node))`.
 */
const MonoidWrapper: Monoid<Wrapper> = EgetMonoid<ReactNode>()

/**
 * Dual `Monoid` for `Wrapper` in outer-to-inner JSX tree order:
 * `MonoidWrapperOuter.concat(outer, inner)(node)` evaluates `outer(inner(node))`.
 */
const MonoidWrapperOuter: Monoid<Wrapper> = Mreverse(MonoidWrapper)

/**
 * Generic `Monoid<Endomorphism<A>>` helper for composing pure state (`setState`) or
 * properties transitions in left-to-right `flow` order, with `identity` as `empty`.
 */
const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> =>
  EgetMonoid<A>()

/**
 * Folds a list of `Endomorphism<A>` transitions left-to-right into a single `Endomorphism<A>`.
 * Directly compatible with React's `setState(updater)`.
 */
const foldEndomorphisms = <A>(
  endomorphisms: ReadonlyArray<Endomorphism<A>>,
): Endomorphism<A> => pipe(endomorphisms, MconcatAll(EgetMonoid<A>()))

/**
 * Folds `Wrapper`s in inner-to-outer pipeline order (`[inner, outer]` -> `outer(inner(node))`).
 */
const foldWrappers: (wrappers: ReadonlyArray<Wrapper>) => Wrapper =
  MconcatAll(MonoidWrapper)

/**
 * Nests `Wrapper`s in outer-to-inner JSX tree order (`[outer, inner]` -> `outer(inner(node))`),
 * flattening provider/layout pyramids into a linear array.
 */
const nestWrappers: (wrappers: ReadonlyArray<Wrapper>) => Wrapper =
  MconcatAll(MonoidWrapperOuter)

/**
 * Guards an `Endomorphism<A>` with a `Predicate<A>`, returning the input unchanged (`identity`)
 * when the predicate does not hold.
 */
const whenEndomorphism =
  <A>(predicate: Predicate<A>): Endomorphism<Endomorphism<A>> =>
  (endomorphism: Endomorphism<A>): Endomorphism<A> =>
  (value: A): A =>
    pipe(
      value,
      OfromPredicate(predicate),
      Omatch(() => value, endomorphism),
    )

/**
 * Builds a `Target` value from a single `Input` by evaluating each pure recipe
 * `Reader<Input, Endomorphism<Target>>` and folding the resulting endomorphisms
 * in list order onto `initial`.
 */
const buildFrom =
  <Input, Target>(
    initial: Target,
    recipes: ReadonlyArray<Reader<Input, Endomorphism<Target>>>,
  ): Reader<Input, Target> =>
  (input: Input): Target =>
    pipe(initial, pipe(recipes, RAflap(input), foldEndomorphisms))

export {
  type Wrapper,
  MonoidWrapper,
  MonoidWrapperOuter,
  getEndomorphismMonoid,
  foldEndomorphisms,
  foldWrappers,
  nestWrappers,
  whenEndomorphism,
  buildFrom,
}
