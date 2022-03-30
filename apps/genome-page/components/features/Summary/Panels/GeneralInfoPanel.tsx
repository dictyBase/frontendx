import React from "react"
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
const GeneralInfoPanel = ({ gene }: Props) => {
  if (!gene.generalInformation?.general_info) return <OtherError />
  const gen_info = gene.generalInformation.general_info

  let output = panelGenerator(
    [
      { id: "Gene Name", value: gene.gene?.name },
      { id: "Name Description", value: gen_info.name_description },
      { id: "Alternative Gene Names", value: gen_info.alt_gene_name },
      { id: "Gene ID", value: gene.gene?.id },
      { id: "Gene Product", value: gen_info.gene_product },
      { id: "Alternative Protein Names", value: gen_info.alt_protein_names },
      { id: "Description", value: gen_info.description },
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

export default GeneralInfoPanel
