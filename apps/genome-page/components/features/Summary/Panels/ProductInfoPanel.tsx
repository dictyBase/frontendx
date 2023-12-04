import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { panelGenerator } from "common/utils/panelGenerator"

type Props = {
  /** Array of GO annotations for a particular gene */
  gene: GeneQuery
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const ProductInfoPanel = ({ gene }: Props) => {
  if (!gene.listGeneProductInfo?.product_info) return <OtherError />
  const productInfo = gene.listGeneProductInfo.product_info[0]

  let output = panelGenerator(
    [
      { id: "Protein Coding Gene", value: productInfo.protein_coding_gene },
      { id: "Protein Length", value: productInfo.protein_length },
      { id: "Molecular Weight", value: productInfo.protein_molecular_weight },
      { id: "More Protein Data", value: productInfo.more_protein_data },
      { id: "Genomic Coords.", value: productInfo.genomic_coords },
    ],
    "generalInformation",
    gene,
  )

  return (
    <div>
      {output?.map((item, key) => {
        return (
          <ItemDisplay key={key}>
            <LeftDisplay>{item.leftDisplay}</LeftDisplay>
            <RightDisplay>{item.rightDisplay}</RightDisplay>
          </ItemDisplay>
        )
      })}
    </div>
  )
}

export default ProductInfoPanel

