import { constant } from "fp-ts/function"

/**
 * Typed error value with a discriminant `type` and a human-readable `message`.
 */
type LoomError<T extends string> = Readonly<{ type: T; message: string }>

/**
 * Builds an error factory that returns the same frozen `LoomError` on every call.
 * Use it as the `onFalse` argument of `Either.fromPredicate`. Same role as
 * fp-go-loom `eithererr.ConstErr`: identity (`toBe`) stays stable across calls.
 */
const constError = <A, T extends string>(
  type: T,
  message: string,
): ((value: A) => LoomError<T>) => constant(Object.freeze({ type, message }))

export { type LoomError, constError }
