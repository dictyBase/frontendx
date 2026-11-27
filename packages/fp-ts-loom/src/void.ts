import { constVoid } from "fp-ts/function"
import type { Monoid } from "fp-ts/Monoid"
import type { Semigroup } from "fp-ts/Semigroup"

/**
 * `Semigroup` instance for `void` whose `concat` discards both arguments via `constVoid`.
 */
const SemigroupVoid: Semigroup<void> = {
  concat: constVoid,
}

/**
 * `Monoid` instance for `void` (`concat: constVoid`, `empty: undefined`).
 * Foundation for lifting effectful unit-returning computations (`Handler<E>`, `Cleanup`).
 */
const MonoidVoid: Monoid<void> = {
  concat: constVoid,
  empty: undefined,
}

export { SemigroupVoid, MonoidVoid }
