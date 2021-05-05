import React from "react"
import withDataFilter from "../utils/withDataFilter"
import { GoAnnotation, Extension, With } from "dicty-graphql-schema"
import WithExtensionLink from "features/Ontology/Table/WithExtensionLink"

type Props = {
  /** Individual GO Annotation */
  data: GoAnnotation
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ data }: Props) => {
  let withData, extensionsData

  if (data.with !== null && data.with !== undefined) {
    withData = withDataFilter(data.with).map((xref: With, index: number) => (
      <React.Fragment key={index}>
        {" "}
        <em>with</em> <WithExtensionLink item={xref} />
      </React.Fragment>
    ))
  }

  if (data.extensions !== null && data.extensions !== undefined) {
    extensionsData = data.extensions
      .slice(0, 2)
      .map((ext: Extension, index: number) => (
        <React.Fragment key={index}>
          {" "}
          <em>{ext.relation}</em> <WithExtensionLink item={ext} />{" "}
        </React.Fragment>
      ))
  }

  return (
    <React.Fragment>
      {data.go_term}
      {withData}
      {extensionsData} ({data.evidence_code})
      <br />
    </React.Fragment>
  )
}

export default GoaPanelContent
