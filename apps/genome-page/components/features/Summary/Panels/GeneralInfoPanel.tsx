import { GeneQuery } from 'dicty-graphql-schema';
import OtherError from "components/errors/OtherError"
import LeftDisplay from "components/panels/LeftDisplay"
import ItemDisplay from "components/panels/ItemDisplay"
import RightDisplay from "components/panels/RightDisplay"
import React from 'react';

type Props = {
  /** Array of GO annotations for a particular gene */
  gene: GeneQuery
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanel = ({ gene }: Props) => {

  if (!gene.generalInformation) return <OtherError />

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>Gene Name</LeftDisplay>
        <RightDisplay>
        {gene.gene?.name}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Name Description</LeftDisplay>
        <RightDisplay>
        {gene.generalInformation.name_description.map((desc, i) => ( 
          <React.Fragment key={i}>
            {desc}
            <br />
          </React.Fragment>
        ))}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Alternative Gene Names</LeftDisplay>
        <RightDisplay>
          {gene.generalInformation.alt_gene_name.map((name, i) => ( 
            <React.Fragment key={i}>
              <i>{name}</i>
              <br />
            </React.Fragment>
          ))}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Gene ID</LeftDisplay>
        <RightDisplay>
          {gene.gene?.id}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Gene Product</LeftDisplay>
        <RightDisplay>
          {gene.generalInformation.gene_product}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Alternative Protein Names</LeftDisplay>
        <RightDisplay>
          {gene.generalInformation.alt_protein_names.map((name, i) => ( 
            <React.Fragment key={i}>
              {name}
              <br />
            </React.Fragment>
          ))}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>Description</LeftDisplay>
        <RightDisplay>
          {gene.generalInformation.description}
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default GeneralInfoPanel
