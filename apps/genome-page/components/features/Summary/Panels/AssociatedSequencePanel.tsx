import React from "react"
import ItemDisplay from "components/panels/ItemDisplay"
import LeftDisplay from "components/panels/LeftDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { GeneQuery } from "dicty-graphql-schema"
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
  console.log(associated_seq)

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>GenBank Genomic Fragment</LeftDisplay>
        <RightDisplay>
          <a
            href={
              associated_seq.associated_sequences.genbank_genomic_fragment.link
            }>
            {associated_seq.associated_sequences.genbank_genomic_fragment.name}
          </a>
        </RightDisplay>
      </ItemDisplay>
      {associated_seq.associated_sequences.genbank_mrna ? (
        <ItemDisplay>
          <LeftDisplay>GenBank mRNA</LeftDisplay>
          <RightDisplay>
            <a href={associated_seq.associated_sequences.genbank_mrna.link}>
              {associated_seq.associated_sequences.genbank_mrna.name}
            </a>
          </RightDisplay>
        </ItemDisplay>
      ) : (
        <></>
      )}
      <ItemDisplay>
        <LeftDisplay>ESTs</LeftDisplay>
        <RightDisplay>
          {associated_seq.associated_sequences.ests ? (
            associated_seq.associated_sequences.ests.map((item, i) => (
              <React.Fragment key={i}>
                <a href={item.link}>{item.name}</a>
                &nbsp;&nbsp;&nbsp;
              </React.Fragment>
            ))
          ) : (
            <></>
          )}
          <a href={associated_seq.associated_sequences.more_link}>more..</a>
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default AssociatedSequencePanel
