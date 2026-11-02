import { pipe } from "fp-ts/function"
import { not } from "fp-ts/Predicate"
import { isEmpty as SisEmpty, trim as Strtrim } from "fp-ts/string"
import type { Gene } from "dicty-graphql-schema"

/**
 * Predicate that reports whether a gene has a usable name.
 *
 * The API currently returns placeholder gene entries with a blank `name` for
 * stock items without any real gene association (e.g. `genes: [{name: ""}]`).
 * Those entries must not be rendered, otherwise an empty tag linking to
 * `/gene/` is displayed.
 *
 * @param gene - The gene association to check.
 * @returns `true` when the gene name is a non-empty (trimmed) string.
 */
const hasUsableName = ({ name }: Omit<Gene, "id">): boolean =>
  pipe(name, Strtrim, not(SisEmpty))

export { hasUsableName }
