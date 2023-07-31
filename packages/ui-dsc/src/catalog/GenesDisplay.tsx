import { Gene } from "dicty-graphql-schema"
import { LinkTag } from "./LinkTag"

type GenesDisplayProperties = {
  /** List of gene IDs */
  genes: Gene[]
}

/**
 * GenesDisplay provides a list of genes displayed as link tags.
 */
const GenesDisplay = ({ genes }: GenesDisplayProperties) => {
  if (genes.length === 0) {
    return <></>
  }

  return (
    <>
      {genes.map((gene) => (
        <LinkTag key={gene.id} item={gene.name} route="gene" />
      ))}
    </>
  )
}

export { GenesDisplay }
