import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/core/styles"
import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"
import withDataFilter from "../utils/withDataFilter"

const useStyles = (theme) =>
  makeStyles({
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

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = ({ item }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <span>
        {item.go_term}
        {item.with !== null &&
          withDataFilter(item.with).map((xref, index) => (
            <Fragment key={index}>
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
            </Fragment>
          ))}
        {item.extensions !== null &&
          item.extensions.slice(0, 2).map((ext, index) => (
            <Fragment key={index}>
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
            </Fragment>
          ))}{" "}
        ({item.evidence_code})
      </span>
      <br />
    </Fragment>
  )
}

export default GoaPanelContent
