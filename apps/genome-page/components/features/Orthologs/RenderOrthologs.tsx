import OtherError from "components/errors/OtherError"
import OrthologsRow from "./OrthologsRow"
import { Orthologs } from "dicty-graphql-schema"

interface RenderOrthologsProps {
  ortholog: Orthologs
}

const RenderOrthologs = ({ ortholog }: RenderOrthologsProps) => {
  if (!ortholog) return <OtherError />
  return (
    <OrthologsRow
      id={ortholog.id}
      species={ortholog.species}
      uniprotkb={ortholog.uniprotkb}
      gene_product={ortholog.gene_product}
      source={ortholog.source}
    />
  )
}

export default RenderOrthologs
