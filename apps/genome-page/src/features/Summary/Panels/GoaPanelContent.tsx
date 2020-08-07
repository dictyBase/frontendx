import React from "react"
import StyledExternalLink from "common/components/StyledExternalLink"
import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"
import withDataFilter from "../utils/withDataFilter"
import { GeneGOA, Extension, With } from "common/@types/gene-data"

type Props = {
  /** Individual GO Annotation */
  data: GeneGOA
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ data }: Props) => (
  <React.Fragment>
    <span>
      {data.go_term}
      {data.with !== null &&
        data.with !== undefined &&
        withDataFilter(data.with).map((xref: With, index: number) => (
          <React.Fragment key={index}>
            <span>
              {" "}
              <em>with</em>{" "}
              {xref.name ? (
                <StyledExternalLink
                  href={withLinkGenerator(xref.id, xref.db, xref.name)}
                  content={xref.name}
                />
              ) : (
                <StyledExternalLink
                  href={withLinkGenerator(xref.id, xref.db)}
                  content={`${xref.db}:${xref.id}`}
                />
              )}
            </span>
          </React.Fragment>
        ))}
      {data.extensions !== null &&
        data.extensions !== undefined &&
        data.extensions.slice(0, 2).map((ext: Extension, index: number) => (
          <React.Fragment key={index}>
            <span>
              {" "}
              <em>{ext.relation}</em>{" "}
              {ext.name ? (
                <StyledExternalLink
                  href={withLinkGenerator(ext.id, ext.db, ext.name)}
                  content={ext.name}
                />
              ) : (
                <StyledExternalLink
                  href={withLinkGenerator(ext.id, ext.db)}
                  content={`${ext.db}:${ext.id}`}
                />
              )}{" "}
            </span>
          </React.Fragment>
        ))}{" "}
      ({data.evidence_code})
    </span>
    <br />
  </React.Fragment>
)

export default GoaPanelContent
