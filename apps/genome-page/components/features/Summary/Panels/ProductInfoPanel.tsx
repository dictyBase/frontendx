import { GeneSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap, head as Ahead } from "fp-ts/Array"
import { map as Omap } from "fp-ts/Option"
import { OtherError } from "components/errors/OtherError"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"

type Properties = {
  /** Array of GO annotations for a particular gene */
  geneProductInformation: GeneSummaryQuery["listGeneProductInformation"]
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const ProductInfoPanel = ({ geneProductInformation }: Properties) => {
  if (!geneProductInformation) return <OtherError />
  const productInformation = geneProductInformation[0]
  return pipe(
    productInformation,
    (productInfo): Array<{ id: ContentId; value: any }> => [
      { id: "Protein Coding Gene", value: productInfo.protein_coding_gene },
      { id: "Protein Length", value: productInfo.protein_length },
      { id: "Molecular Weight", value: productInfo.protein_molecular_weight },
      { id: "More Protein Data", value: productInfo.more_protein_data },
      { id: "Genomic Coords.", value: productInfo.genomic_coords },
    ],
    Amap(({ id, value }) => (
      <ItemDisplay key={id}>
        <LeftDisplay>{id}</LeftDisplay>
        <RightDisplay>{returnPanelContentById(id, value)}</RightDisplay>
      </ItemDisplay>
    )),
    (children) => <div>{children}</div>,
  )
}

export { ProductInfoPanel }
