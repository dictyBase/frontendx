import React from "react"
import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"

type Props = {
  gene: GeneQuery
}

/**
 * Panel to display Protein Sequence on the Protein Information page.
 */
const ProteinSequence = ({ gene }: Props) => {
  if (!gene.getProteinInformation?.protein_information) return <OtherError />
  const sequence =
    gene.getProteinInformation?.protein_information.protein_sequence

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>Protein Sequence</LeftDisplay>
        <RightDisplay>{sequence}</RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default ProteinSequence
