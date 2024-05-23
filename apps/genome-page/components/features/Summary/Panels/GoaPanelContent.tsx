import React from "react"
import { GeneSummaryQuery, GoAnnotation, Extension, With } from "dicty-graphql-schema"
import { WithExtensionLink } from "components/features/Ontology/Table/WithExtensionLink"
import { withDataFilter } from "../utils/withDataFilter"

type Properties = {
  /** Individual GO Annotation */
  data: NonNullable<GeneSummaryQuery["geneOntologyAnnotation"]>[0]
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ data }: Properties) => {
  let withData
  let extensionsData

  if (data.with !== null && data.with !== undefined) {
    withData = withDataFilter(data.with).map((xref: With) => (
      <React.Fragment key={xref.id}>
        {" "}
        <em>with</em> <WithExtensionLink item={xref} />
      </React.Fragment>
    ))
  }

  if (data.extensions !== null && data.extensions !== undefined) {
    extensionsData = data.extensions.slice(0, 2).map((extension: Extension) => (
      <React.Fragment key={extension.id}>
        {" "}
        <em>{extension.relation}</em> <WithExtensionLink item={extension} />{" "}
      </React.Fragment>
    ))
  }

  return (
    <>
      {data.go_term}
      {withData}
      {extensionsData} ({data.evidence_code})
      <br />
    </>
  )
}

export { GoaPanelContent }
