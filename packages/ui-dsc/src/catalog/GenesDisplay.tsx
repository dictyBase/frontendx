import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import type { Gene } from "dicty-graphql-schema"
import { LinkTag } from "./LinkTag"

type GenesDisplayProperties = {
  /** List of genes associated with a stock item. */
  genes: Array<Omit<Gene, "id">>
}

/**
 * GenesDisplay provides a list of genes displayed as link tags.
 *
 * Filtering of placeholder gene entries (those whose `name` is blank) is the
 * responsibility of the caller — use the `hasUsableName` utility exported from
 * this package before passing genes down to this component.
 *
 * @param genes - The gene associations to display.
 */
const GenesDisplay = ({ genes }: GenesDisplayProperties) => (
  <>
    {pipe(
      genes,
      Amap((gene) => <LinkTag key={gene.name} item={gene.name} route="gene" />),
    )}
  </>
)

export { GenesDisplay }
