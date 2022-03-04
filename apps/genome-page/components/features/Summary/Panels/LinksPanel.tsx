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
 * Panel to display Links Panel on the Gene Summary page.
 */
const LinkPanel = ({ data }: Props) => {
  if (!data.getLinks?.links) return <OtherError />
  const links = data.getLinks.links

  return (
    <div>
      <ItemDisplay>
        <LeftDisplay>Expression</LeftDisplay>
        <RightDisplay>
          {links.expression ? (
            links.expression.map((item, i) => (
              <a href={item.link} key={i}>
                {item.name} |{" "}
              </a>
            ))
          ) : (
            <></>
          )}
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>dictyBase Colleagues</LeftDisplay>
        <RightDisplay>
          <a href={links.colleagues.link}>{links.colleagues.name}</a>
        </RightDisplay>
      </ItemDisplay>
      <ItemDisplay>
        <LeftDisplay>External Resources</LeftDisplay>
        <RightDisplay>
          {links.ext_resources ? (
            links.ext_resources.map((item, i) => (
              <a href={item.link} key={i}>
                {item.name} |{" "}
              </a>
            ))
          ) : (
            <></>
          )}
        </RightDisplay>
      </ItemDisplay>
    </div>
  )
}

export default LinkPanel
