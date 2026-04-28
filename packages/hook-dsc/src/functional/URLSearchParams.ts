import { pipe } from "fp-ts/function"
import { type Option, fromNullable as OfromNullable } from "fp-ts/Option"

const get: (k: string) => (fa: URLSearchParams) => Option<string> =
  (k) => (fa) =>
    pipe(fa.get(k), OfromNullable)

export { get }
