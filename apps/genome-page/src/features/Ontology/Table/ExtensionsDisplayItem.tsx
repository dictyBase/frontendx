import React from "react"
import StyledExternalLink from "common/components/StyledExternalLink"
import withLinkGenerator from "../utils/withLinkGenerator"
import { Extension } from "common/@types/gene-data"

type Props = {
  /** Individual extension for a given annotation */
  item: Extension
}

/**
 * This handles the display for the extensions GO data.
 */

const ExtensionsDisplayItem = ({ item }: Props) => {
  let link = (
    <StyledExternalLink
      href={withLinkGenerator(item.id, item.db)}
      content={`(${item.db}:${item.id})`}
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

  return (
    <>
      <em>{item.relation}</em> {link}
    </>
  )
}

export default ExtensionsDisplayItem
