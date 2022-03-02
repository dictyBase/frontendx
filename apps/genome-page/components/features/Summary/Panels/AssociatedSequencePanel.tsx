import React from "react"
import ItemDisplay from "components/panels/ItemDisplay"
import LeftDisplay from "components/panels/LeftDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { GeneQuery, GoAnnotation } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"

type Props = {
  /** Array of GO annotations for a particular gene */
  data: GeneQuery
}

/**
 * Panel to display Associated Sequence Panel on the Gene Summary page.
 */
const AssociatedSequencePanel = ({ data }: Props) => {
  if (!data.getAssociatedSequnces) return <OtherError />
  const associated_seq = data.getAssociatedSequnces

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>GenBank Genomic Fragment</LeftDisplay>
        <RightDisplay>
          {associated_seq.associated_sequences.genbank_genomic_fragment}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>ESTs</LeftDisplay>
        <RightDisplay>
          {associated_seq.associated_sequences.ests ? (
            associated_seq.associated_sequences.ests.map((item, i) => (
              <React.Fragment key={i}>{item}&nbsp;&nbsp;&nbsp;</React.Fragment>
            ))
          ) : (
            <></>
          )}
          <a href="">more..</a>
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default AssociatedSequencePanel
