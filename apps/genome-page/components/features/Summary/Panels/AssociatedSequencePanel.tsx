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
  if (!data.gene || !data.gene.associated_sequences) return <OtherError />
  const associated_seq = data.gene.associated_sequences

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>GenBank Genomic Fragment</LeftDisplay>
        <RightDisplay>{associated_seq.genbank_genomic_fragment}</RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Cellular Component</LeftDisplay>
        <RightDisplay>
          {associated_seq.ests.map((item, i) => (
            <React.Fragment key={i}>{item}&nbsp;&nbsp;&nbsp;</React.Fragment>
          ))}
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default AssociatedSequencePanel
