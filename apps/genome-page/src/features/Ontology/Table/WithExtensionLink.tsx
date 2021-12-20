import React from "react"
import StyledExternalLink from "components/StyledExternalLink"
import withLinkGenerator from "../utils/withLinkGenerator"
import { With, Extension } from "dicty-graphql-schema"

type Props = {
  /** Individual With or Extension item for a given annotation */
  item: Extension | With
}

/**
 * This handles the display for With or Extension links.
 */

const WithExtensionLink = ({ item }: Props) => {
  let link = (
    <StyledExternalLink
      href={withLinkGenerator(item.id, item.db)}
      content={`${item.db}:${item.id}`}
    />
  )

  if (item.name) {
    link = (
      <StyledExternalLink
        href={withLinkGenerator(item.id, item.db, item.name)}
        content={item.name}
      />
    )
  }

  return link
}

export default WithExtensionLink
