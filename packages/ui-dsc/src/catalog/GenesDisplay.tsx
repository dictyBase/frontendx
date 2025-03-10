import { Gene } from "dicty-graphql-schema"
import { LinkTag } from "./LinkTag"

type GenesDisplayProperties = {
  /** List of gene IDs */
  genes: Array<Omit<Gene, "id">>
}

/**
 * GenesDisplay provides a list of genes displayed as link tags.
 */
const GenesDisplay = ({ genes }: GenesDisplayProperties) => (
  <>
    {genes.map((gene) => (
      <LinkTag key={gene.name} item={gene.name} route="gene" />
    ))}
  </>
)

export { GenesDisplay }
