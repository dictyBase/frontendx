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
 * Panel to display Links Panel on the Gene Summary page.
 */
const LinkPanel = ({ data }: Props) => {
  if (!data.getLinks?.links) return <OtherError />
  const links = data.getLinks.links

  let output = panelGenerator(
    [
      { id: "Expression", value: links.expression },
      { id: "dictyBase Colleagues", value: links.colleagues },
      { id: "External Resources", value: links.ext_resources },
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
    </div>
  )
}

export default LinkPanel
