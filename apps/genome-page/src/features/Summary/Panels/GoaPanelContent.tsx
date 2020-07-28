import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"
import withDataFilter from "../utils/withDataFilter"
import { GeneGOA, Extension, With } from "common/@types/gene-data"

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

type Props = {
  /** Individual GO Annotation */
  data: GeneGOA
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ data }: Props) => {
  const classes = useStyles()

  return (
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
                  <a
                    className={classes.link}
                    href={withLinkGenerator(xref.id, xref.db, xref.name)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {xref.name}
                  </a>
                ) : (
                  <a
                    className={classes.link}
                    href={withLinkGenerator(xref.id, xref.db)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {xref.db}:{xref.id}
                  </a>
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
                  <a
                    className={classes.link}
                    href={withLinkGenerator(ext.id, ext.db, ext.name)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {ext.name}
                  </a>
                ) : (
                  <a
                    className={classes.link}
                    href={withLinkGenerator(ext.id, ext.db)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {ext.db}:{ext.id}
                  </a>
                )}{" "}
              </span>
            </React.Fragment>
          ))}{" "}
        ({data.evidence_code})
      </span>
      <br />
    </React.Fragment>
  )
}

export default GoaPanelContent
