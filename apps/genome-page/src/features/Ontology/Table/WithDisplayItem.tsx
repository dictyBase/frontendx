import React from "react"
import StyledExternalLink from "common/components/StyledExternalLink"
import withLinkGenerator from "../utils/withLinkGenerator"
import { With } from "common/@types/gene-data"

type Props = {
  /** Individual With data for a given annotation */
  item: With
}

/**
 * This handles the display of an individual item in the
 * With data array.
 */

const WithDisplayItem = ({ item }: Props) => {
  if (!item.name) {
    return (
      <StyledExternalLink
        href={withLinkGenerator(item.id, item.db)}
        content={`${item.db}:${item.id}`}
      />
    )
  }

  return (
    <StyledExternalLink
      href={withLinkGenerator(item.id, item.db, item.name)}
      content={item.name}
    />
  )
}

export default WithDisplayItem
