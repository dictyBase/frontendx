import type { Endomorphism } from "fp-ts/Endomorphism"
import { constVoid, pipe } from "fp-ts/function"
import { concatAll as MconcatAll, type Monoid } from "fp-ts/Monoid"
import { fromPredicate as OfromPredicate, match as Omatch } from "fp-ts/Option"
import type { Predicate } from "fp-ts/Predicate"
import {
  getMonoid as RgetMonoid,
  local as Rlocal,
  type Reader,
} from "fp-ts/Reader"
import { MonoidVoid } from "./void"

/**
 * Pure algebraic representation of a React event/callback handler `(event: E) => void`.
 */
type Handler<E> = Reader<E, void>

/**
 * Lifts `MonoidVoid` into a `Monoid<Handler<E>>` via `Reader.getMonoid`.
 * `concat(first, second)(event)` runs `first(event)` then `second(event)`;
 * `empty` is a safe no-op handler.
 */
const getHandlerMonoid = <E = never>(): Monoid<Handler<E>> =>
  RgetMonoid<E, void>(MonoidVoid)

/**
 * Folds a list of `Handler<E>` callbacks into a single `Handler<E>` executed sequentially.
 */
const foldHandlers = <E>(handlers: ReadonlyArray<Handler<E>>): Handler<E> =>
  pipe(handlers, MconcatAll(getHandlerMonoid<E>()))

/**
 * Guards a `Handler<E>` with a `Predicate<E>` (`fp-ts/Predicate`), returning an
 * `Endomorphism<Handler<E>>` built purely via `Option.fromPredicate` + `Option.match(constVoid, handler)`.
 */
const when =
  <E>(predicate: Predicate<E>): Endomorphism<Handler<E>> =>
  (handler: Handler<E>): Handler<E> =>
  (event: E): void =>
    pipe(event, OfromPredicate(predicate), Omatch(constVoid, handler))

/**
 * Contravariantly adapts a `Handler<Target>` to consume `Source` events via `Reader.local`.
 */
const contramapHandler =
  <Source, Target>(extract: (source: Source) => Target) =>
  (handler: Handler<Target>): Handler<Source> =>
    pipe(handler, Rlocal(extract))

export { type Handler, getHandlerMonoid, foldHandlers, when, contramapHandler }
