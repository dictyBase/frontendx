import React from "react"
import { GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"
import { commaSeparate } from "common/utils/strings"

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

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>Gene Name</LeftDisplay>
        <RightDisplay>{gene.gene?.name}</RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Name Description</LeftDisplay>
        <RightDisplay>
          {gen_info.name_description?.map((desc, i) => (
            <React.Fragment key={i}>
              {desc}
              <br />
            </React.Fragment>
          ))}
        </RightDisplay>
      </ItemDisplay>
      {gen_info.alt_gene_name ? (
        <ItemDisplay>
          <LeftDisplay>Alternative Gene Names</LeftDisplay>
          <RightDisplay>
                <i>{commaSeparate(gen_info.alt_gene_name)}</i>
          </RightDisplay>
        </ItemDisplay>
      ) : (
        <></>
      )}
      <ItemDisplay>
        <LeftDisplay>Gene ID</LeftDisplay>
        <RightDisplay>{gene.gene?.id}</RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Gene Product</LeftDisplay>
        <RightDisplay>{gen_info.gene_product}</RightDisplay>
      </ItemDisplay>
      {gen_info.alt_protein_names ? (
        <ItemDisplay>
          <LeftDisplay>Alternative Protein Names</LeftDisplay>
          <RightDisplay>
            {gen_info.alt_protein_names.map((name, i) => (
              <React.Fragment key={i}>
                {name}
                <br />
              </React.Fragment>
            ))}
          </RightDisplay>
        </ItemDisplay>
      ) : (
        <></>
      )}
      <ItemDisplay>
        <LeftDisplay>Description</LeftDisplay>
        <RightDisplay>{gen_info.description}</RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default GeneralInfoPanel
