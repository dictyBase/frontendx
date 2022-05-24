import React from "react"
import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { panelGenerator } from "common/utils/panelGenerator"

type Props = {
  gene: GeneQuery
}

/**
 * Panel to display General Info on the Product Information page.
 */
const ProteinGeneralInfo = ({ gene }: Props) => {
  if (!gene.getProteinInformation?.protein_information) return <OtherError />
  const gen_info = gene.getProteinInformation?.protein_information?.general_info

  let output = panelGenerator(
    [
      { id: "Gene Product", value: gen_info?.gene_product },
      { id: "dictyBase ID", value: gen_info?.dictybase_id },
      { id: "Description", value: gen_info?.description },
      { id: "Protein Length", value: gen_info?.protein_length },
      { id: "Molecular Weight", value: gen_info?.molecular_weight },
      { id: "AA Composition", value: gen_info?.aa_composition },
      { id: "Subcellular location", value: gen_info?.subcellular_location },
      { id: "Protein existence", value: gen_info?.protein_existence },
      { id: "Note", value: gen_info?.note },
    ],
    "getProteinInformation",
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

export default ProteinGeneralInfo
