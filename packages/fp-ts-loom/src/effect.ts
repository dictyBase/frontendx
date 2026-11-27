import { match as Bmatch } from "fp-ts/boolean"
import type { Endomorphism } from "fp-ts/Endomorphism"
import { pipe } from "fp-ts/function"
import { getMonoid as IOgetMonoid, map as IOmap, type IO } from "fp-ts/IO"
import { concatAll as MconcatAll, type Monoid } from "fp-ts/Monoid"
import { MonoidVoid } from "./void"

/**
 * Lazy synchronous teardown action `IO<void>` (`() => void`) returned from a React `useEffect`.
 */
type Cleanup = IO<void>

/**
 * Lazy synchronous mount computation `IO<Cleanup>` (`IO<IO<void>>`) directly compatible
 * with React's `useEffect(effect, dependencies)`.
 */
type Effect = IO<Cleanup>

/**
 * `Monoid` for `Cleanup` (`IO<void>`) built via `IO.getMonoid(MonoidVoid)`.
 * `concat` runs both teardown actions sequentially when invoked; `empty` is a lazy no-op.
 */
const MonoidCleanup: Monoid<Cleanup> = IOgetMonoid(MonoidVoid)

/**
 * `Monoid` for `Effect` (`IO<IO<void>>`) built via `IO.getMonoid(MonoidCleanup)`.
 * Composes both the mount phase AND the returned cleanup thunks lazily in sequence.
 */
const MonoidEffect: Monoid<Effect> = IOgetMonoid(MonoidCleanup)

/**
 * Folds a list of `Cleanup` actions into one composite `Cleanup`.
 */
const foldCleanups: (cleanups: ReadonlyArray<Cleanup>) => Cleanup =
  MconcatAll(MonoidCleanup)

/**
 * Folds a list of `Effect` computations into one composite `Effect` suitable for a single `useEffect`.
 */
const foldEffects: (effects: ReadonlyArray<Effect>) => Effect =
  MconcatAll(MonoidEffect)

/**
 * Lifts a mount-only `IO<void>` action (with no teardown) into an `Effect` returning `MonoidCleanup.empty`.
 */
const fromMount = (mount: IO<void>): Effect =>
  pipe(
    mount,
    IOmap((): Cleanup => MonoidCleanup.empty),
  )

/**
 * Guards an `Effect` with a boolean condition using `fp-ts/boolean` `match`,
 * returning `MonoidEffect.empty` when `condition` is `false` so `useEffect` stays unconditional.
 */
const whenEffect =
  (condition: boolean): Endomorphism<Effect> =>
  (effect: Effect): Effect =>
    pipe(
      condition,
      Bmatch(
        (): Effect => MonoidEffect.empty,
        (): Effect => effect,
      ),
    )

export {
  type Cleanup,
  type Effect,
  MonoidCleanup,
  MonoidEffect,
  foldCleanups,
  foldEffects,
  fromMount,
  whenEffect,
}
