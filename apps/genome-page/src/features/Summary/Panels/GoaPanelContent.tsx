import React from "react"
import WithDisplayItem from "features/Ontology/Table/WithDisplayItem"
import withDataFilter from "../utils/withDataFilter"
import { GeneGOA, Extension, With } from "common/@types/gene-data"
import ExtensionsDisplayItem from "features/Ontology/Table/ExtensionsDisplayItem"

type Props = {
  /** Individual GO Annotation */
  data: GeneGOA
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
        <em>with</em> <WithDisplayItem item={xref} />
      </React.Fragment>
    ))
  }

  if (data.extensions !== null && data.extensions !== undefined) {
    extensionsData = data.extensions
      .slice(0, 2)
      .map((ext: Extension, index: number) => (
        <React.Fragment key={index}>
          {" "}
          <ExtensionsDisplayItem item={ext} />{" "}
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
