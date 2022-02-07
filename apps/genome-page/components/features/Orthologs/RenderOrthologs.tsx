import OtherError from "components/errors/OtherError"
import OrthologsRow from "./OrthologsRow"

interface RenderOrthologsProps {
    ortholog: {
            __typename?: "Orthologs"
            id: string
            species: string
            uniprotkb: string
            gene_product: string
            source?: Array<string> | null | undefined;
            }
        | null | undefined
}

const RenderOrthologs = ({ ortholog }: RenderOrthologsProps) => {
    if(!ortholog) return <OtherError />
    return (
        <OrthologsRow
            id={ortholog.id}
            species={ortholog.species}
            uniprotkb={ortholog.uniprotkb}
            gene_product={ortholog.gene_product}
            source = {ortholog.source}
        />
    )
}

export default RenderOrthologs
