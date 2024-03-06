import React from "react"
import ItemDisplay from "components/panels/ItemDisplay"
import LeftDisplay from "components/panels/LeftDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import { panelGenerator } from "common/utils/panelGenerator"

type Properties = {
  /** Array of GO annotations for a particular gene */
  data: GeneQuery
}

/**
 * Panel to display Associated Sequence Panel on the Gene Summary page.
 */
const AssociatedSequencePanel = ({ data }: Properties) => {
  if (!data.getAssociatedSequnces) return <OtherError />
  const associated_seq = data.getAssociatedSequnces

  const output = panelGenerator(
    [
      {
        id: "GenBank Genomic Fragment",
        value: associated_seq.associated_sequences.genbank_genomic_fragment,
      },
      {
        id: "GenBank mRNA",
        value: associated_seq.associated_sequences.genbank_mrna,
      },
      { id: "ESTs", value: associated_seq.associated_sequences },
    ],
    "getAssociatedSequnces",
    data,
  )

  return (
    <div>
      {output?.map((item, key) => (
        <ItemDisplay key={key}>
          <LeftDisplay>{item.leftDisplay}</LeftDisplay>
          <RightDisplay>{item.rightDisplay}</RightDisplay>
        </ItemDisplay>
      ))}
    </div>
  )
}

export { AssociatedSequencePanel }
