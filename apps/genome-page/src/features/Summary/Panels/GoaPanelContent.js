// @flow
import React, { Fragment } from "react"
import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"
import { withStyles } from "@material-ui/core/styles"

// function to filter the With data
const withDataFilter = (arr) => {
  // filter With array by db type
  const dictyChecker = arr.filter((item) => item.db === "dictyBase").slice(0, 2)
  const uniprotChecker = arr
    .filter((item) => item.db === "UniProtKB")
    .slice(0, 2)
  const mgiChecker = arr.filter((item) => item.db === "MGI").slice(0, 2)
  const rgdChecker = arr.filter((item) => item.db === "RGD").slice(0, 2)
  const sgdChecker = arr.filter((item) => item.db === "SGD").slice(0, 2)
  const pomChecker = arr.filter((item) => item.db === "PomBase").slice(0, 2)

  // order of preference to display With data
  // dicty => UniProt => MGI => RGD => SGD => PomBase
  if (!Array.isArray(dictyChecker) || !dictyChecker.length) {
    if (!Array.isArray(uniprotChecker) || !uniprotChecker.length) {
      if (!Array.isArray(mgiChecker) || !mgiChecker.length) {
        if (!Array.isArray(rgdChecker) || !rgdChecker.length) {
          if (!Array.isArray(sgdChecker) || !sgdChecker.length) {
            return pomChecker
          }
          return sgdChecker
        }
        return rgdChecker
      }
      return mgiChecker
    }
    return uniprotChecker
  }

  return dictyChecker
}

// Material-UI stylings
const styles = (theme) => ({
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
  /** Material-UI styling */
  classes: Object,
  /** The mapped item to display on a line in GoaPanel */
  item: Object,
}

/**
 * The content that goes in the right side of the GOA panel on the summary page.
 */

const GoaPanelContent = (props: Props) => {
  const { item, classes } = props

  return (
    <Fragment>
      <span>
        {item.goterm}
        {item.with !== null &&
          withDataFilter(item.with).map((xref: Object, i: string) => (
            <Fragment key={i}>
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
          item.extensions.slice(0, 2).map((ext: Object, i: string) => (
            <Fragment key={i}>
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

export default withStyles(styles)(GoaPanelContent)
