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
 * Panel to display Protein Links on the Protein Information page.
 */
const ProteinLinks = ({ gene }: Props) => {
  if (!gene.getProteinInformation?.protein_information) return <OtherError />
  const links = gene.getProteinInformation?.protein_information.external_links

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>External Links</LeftDisplay>
        <RightDisplay>
          {links.map((item, i) => (
            <a key={i} href={item.link}>
              {item.name} &nbsp; &nbsp; &nbsp;
            </a>
          ))}
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default ProteinLinks
