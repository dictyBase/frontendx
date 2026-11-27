import type { Either } from "fp-ts/Either"
import { flow } from "fp-ts/function"
import { fromEither as OfromEither } from "fp-ts/Option"
import { filterMap as RAfilterMap } from "fp-ts/ReadonlyArray"

/**
 * Parses every string with `parse` and keeps only the successes. Use it only
 * when a failure is legitimately ignorable. For required data, use
 * `ReadonlyArray.traverse(Either.Applicative)` so a failure stays visible.
 * Same role as fp-go-loom `arrutils.ParseWith`.
 */
const parseWith = <E, A>(
  parse: (input: string) => Either<E, A>,
): ((inputs: ReadonlyArray<string>) => ReadonlyArray<A>) =>
  RAfilterMap(flow(parse, OfromEither))

export { parseWith }
