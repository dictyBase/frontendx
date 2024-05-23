import React from "react"
import { GeneSummaryQuery, Extension, With } from "dicty-graphql-schema"
import { WithExtensionLink } from "components/features/Ontology/Table/WithExtensionLink"
import { withDataFilter } from "../utils/withDataFilter"

type Properties = {
  /** Individual GO Annotation */
  goa: NonNullable<GeneSummaryQuery["geneOntologyAnnotation"]>[0]
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ goa }: Properties) => {
  let withData
  let extensionsData

  if (goa.with !== null && goa.with !== undefined) {
    withData = withDataFilter(goa.with).map((xref: With) => (
      <React.Fragment key={xref.id}>
        <em>with</em> <WithExtensionLink item={xref} />
      </React.Fragment>
    ))
  }

  if (goa.extensions !== null && goa.extensions !== undefined) {
    extensionsData = goa.extensions.slice(0, 2).map((extension: Extension) => (
      <React.Fragment key={extension.id}>
        <em>{extension.relation}</em> <WithExtensionLink item={extension} />{" "}
      </React.Fragment>
    ))
  }

  return (
    <>
      {goa.go_term}
      {withData}
      {extensionsData} ({goa.evidence_code})
      <br />
    </>
  )
}

export { GoaPanelContent }
