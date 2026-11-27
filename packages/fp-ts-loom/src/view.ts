import type { ReactNode } from "react"
import type { Endomorphism } from "fp-ts/Endomorphism"
import { pipe } from "fp-ts/function"
import { concatAll as MconcatAll, type Monoid } from "fp-ts/Monoid"
import { fromPredicate as OfromPredicate, match as Omatch } from "fp-ts/Option"
import type { Predicate } from "fp-ts/Predicate"
import {
  getMonoid as RgetMonoid,
  getSemigroup as RgetSemigroup,
  local as Rlocal,
  map as Rmap,
  type Reader,
} from "fp-ts/Reader"
import { matchLeft as RAmatchLeft } from "fp-ts/ReadonlyArray"
import { concatAll as SconcatAll, type Semigroup } from "fp-ts/Semigroup"
import type { Wrapper } from "./endomorphism"
import { intercalateNode, MonoidNode } from "./node"

/**
 * Pure React view represented as `Reader<P, ReactNode>` (`(properties: P) => ReactNode`).
 * Every React functional component of props `P` is already a `View<P>`.
 */
type View<P> = Reader<P, ReactNode>

/**
 * Lifts a `Semigroup<ReactNode>` (defaults to `MonoidNode`) into a `Semigroup<View<P>>`
 * via `Reader.getSemigroup` for horizontal view composition.
 */
const getViewSemigroup = <P = never>(
  semigroup: Semigroup<ReactNode> = MonoidNode,
): Semigroup<View<P>> => RgetSemigroup<P, ReactNode>(semigroup)

/**
 * Lifts `MonoidNode` into a `Monoid<View<P>>` via `Reader.getMonoid` for horizontal
 * view composition, with `() => <></>` as `empty`.
 */
const getViewMonoid = <P = never>(): Monoid<View<P>> =>
  RgetMonoid<P, ReactNode>(MonoidNode)

/**
 * Folds a list of `View<P>` components horizontally into one `View<P>` sharing the same `P`.
 */
const foldViews = <P>(views: ReadonlyArray<View<P>>): View<P> =>
  pipe(views, MconcatAll(getViewMonoid<P>()))

/**
 * Joins a list of `View<P>` components horizontally with `separator` inserted between adjacent views,
 * returning the empty view when `views` is empty.
 */
const intercalateViews =
  (separator: ReactNode) =>
  <P>(views: ReadonlyArray<View<P>>): View<P> =>
    pipe(
      views,
      RAmatchLeft(
        (): View<P> => getViewMonoid<P>().empty,
        (head, tail) =>
          pipe(
            tail,
            SconcatAll(getViewSemigroup<P>(intercalateNode(separator)))(head),
          ),
      ),
    )

/**
 * Contravariantly adapts a `View<Target>` to accept `Source` properties via `Reader.local`.
 */
const contramapView =
  <Source, Target>(adapt: (source: Source) => Target) =>
  (view: View<Target>): View<Source> =>
    pipe(view, Rlocal(adapt))

/**
 * Decorates a `View<P>` with a vertical `Wrapper` (`Endomorphism<ReactNode>`) via `Reader.map`.
 */
const wrapView =
  <P>(wrapper: Wrapper): Endomorphism<View<P>> =>
  (view: View<P>): View<P> =>
    pipe(view, Rmap(wrapper))

/**
 * Guards a `View<P>` with a `Predicate<P>`, rendering `MonoidNode.empty` (`<></>`)
 * when the predicate does not hold.
 */
const guardView =
  <P>(predicate: Predicate<P>): Endomorphism<View<P>> =>
  (view: View<P>): View<P> =>
  (properties: P): ReactNode =>
    pipe(
      properties,
      OfromPredicate(predicate),
      Omatch((): ReactNode => MonoidNode.empty, view),
    )

export {
  type View,
  getViewSemigroup,
  getViewMonoid,
  foldViews,
  intercalateViews,
  contramapView,
  wrapView,
  guardView,
}
