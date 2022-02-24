import { GeneQuery } from 'dicty-graphql-schema';
import OtherError from "components/errors/OtherError"
import Image from "next/image"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"
import TableDisplay from '../../../panels/GenomicCoordsTable';


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

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>Protein Coding Gene</LeftDisplay>
        <RightDisplay>
        {productInfo.protein_coding_gene}
        <Image
                    src="/icon_yes_green.png"
                    alt="Yes Icon"
                    width={30}
                    height={30}
                  />
            {"(Curator reviewed)"}
            <br/>
            {"Derived from gene prediction. Supported by mRNA."}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Protein Length</LeftDisplay>
          <RightDisplay>
            {productInfo.protein_length}
          </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Molecular Weight</LeftDisplay>
          <RightDisplay>
            {productInfo.protein_molecular_weight}
          </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>More Protein Data</LeftDisplay>
          <RightDisplay>
            <a href={productInfo.more_protein_data}>Protein sequence, domains and much more...</a>
          </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Genomic Coords.</LeftDisplay>
        <RightDisplay>
          <TableDisplay data={productInfo.genomic_coords}></TableDisplay>
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default ProductInfoPanel
