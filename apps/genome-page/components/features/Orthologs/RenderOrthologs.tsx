import OtherError from "components/errors/OtherError"
import { Orthologs } from "dicty-graphql-schema"
import OrthologsRow from "./OrthologsRow"

interface RenderOrthologsProperties {
  ortholog: Orthologs
}

const RenderOrthologs = ({ ortholog }: RenderOrthologsProperties) => {
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

export { RenderOrthologs }
