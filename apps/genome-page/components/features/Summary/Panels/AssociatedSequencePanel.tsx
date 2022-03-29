import React from "react"
import ItemDisplay from "components/panels/ItemDisplay"
import LeftDisplay from "components/panels/LeftDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import { panelGenerator } from "common/utils/panelGenerator"

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

  let output = panelGenerator(
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
    "getLinks",
    data,
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
      {/* <ItemDisplay>
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
      </ItemDisplay> */}
    </div>
  )
}

export default AssociatedSequencePanel
