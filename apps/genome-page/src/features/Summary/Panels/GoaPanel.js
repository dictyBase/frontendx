// @flow
import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"

// function that takes in the data array and the type (i.e. "molecular_function") to filter by
const dataFilter = (arr, type) => {
  // get the attributes from specified type
  const attr = arr
    .filter(item => item.type === type)
    .map(item => item.attributes)

  // get the five most recent EXP annotations
  const expChecker = attr
    .filter(
      item =>
        item.evidence_code === "IMP" ||
        item.evidence_code === "IGI" ||
        item.evidence_code === "IDA" ||
        item.evidence_code === "IPI" ||
        item.evidence_code === "IEP" ||
        item.evidence_code === "EXP",
    )
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // get five most recent manual
  const manualChecker = attr
    .filter(item => item.evidence_code !== "IEA")
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // get five most recent electronic
  const electronicChecker = attr
    .filter(item => item.evidence_code === "IEA")
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // check if EXP array is empty
  // if it is, return manual
  // if manual is empty, return electronic
  if (!Array.isArray(expChecker) || !expChecker.length) {
    if (!Array.isArray(manualChecker) || !manualChecker.length) {
      return electronicChecker
    }
    return manualChecker
  }
  return expChecker
}

// function to filter the With data
const withDataFilter = arr => {
  // filter With array by db type
  const dictyChecker = arr.filter(item => item.db === "dictyBase").slice(0, 2)
  const uniprotChecker = arr.filter(item => item.db === "UniProtKB").slice(0, 2)
  const mgiChecker = arr.filter(item => item.db === "MGI").slice(0, 2)
  const rgdChecker = arr.filter(item => item.db === "RGD").slice(0, 2)
  const sgdChecker = arr.filter(item => item.db === "SGD").slice(0, 2)
  const pomChecker = arr.filter(item => item.db === "PomBase").slice(0, 2)

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
const styles = theme => ({
  root: {
    width: "100%",
  },
  table: {
    borderBottom: "1px dotted #A3BAE9",
  },
  tableLeftData: {
    backgroundColor: "#e6f2ff",
    minWidth: 150,
    maxWidth: 200,
    fontSize: "1.1em",
  },
  tableRightData: {
    width: "80%",
  },
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
  /** Object representing the "goa" slice of state */
  panelData: Object,
}

/**
 * Panel to display Gene Ontology Annotations in Gene Summary tab
 */

const GoaPanel = (props: Props) => {
  const { classes, panelData } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableLeftData}>
              Molecular Function
            </TableCell>
            <TableCell className={classes.tableRightData}>
              {dataFilter(panelData.data.data[0], "molecular_function").map(
                (item: Object, i: string) => (
                  <Fragment key={i}>
                    <span>
                      {item.goterm}
                      {item.with !== null &&
                        withDataFilter(item.with).map(
                          (xref: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>with</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(xref.id, xref.db)}
                                  target="_blank">
                                  {!xref.name && `${xref.db}:${xref.id}`}
                                  {xref.name && `${xref.name}`}
                                </a>
                              </span>
                            </Fragment>
                          ),
                        )}
                      {item.extensions !== null &&
                        item.extensions
                          .slice(0, 2)
                          .map((ext: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>{ext.relation}</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(ext.id, ext.db)}
                                  target="_blank">
                                  {!ext.name && `${ext.db}:${ext.id}`}
                                  {ext.name && `${ext.name}`}
                                </a>{" "}
                              </span>
                            </Fragment>
                          ))}{" "}
                      ({item.evidence_code})
                    </span>
                    <br />
                  </Fragment>
                ),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableLeftData}>
              Biological Process
            </TableCell>
            <TableCell className={classes.tableRightData}>
              {dataFilter(panelData.data.data[0], "biological_process").map(
                (item, i) => (
                  <Fragment key={i}>
                    <span>
                      {item.goterm}
                      {item.with !== null &&
                        withDataFilter(item.with).map(
                          (xref: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>with</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(xref.id, xref.db)}
                                  target="_blank">
                                  {!xref.name && `${xref.db}:${xref.id}`}
                                  {xref.name && `${xref.name}`}
                                </a>
                              </span>
                            </Fragment>
                          ),
                        )}
                      {item.extensions !== null &&
                        item.extensions
                          .slice(0, 2)
                          .map((ext: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>{ext.relation}</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(ext.id, ext.db)}
                                  target="_blank">
                                  {!ext.name && `${ext.db}:${ext.id}`}
                                  {ext.name && `${ext.name}`}
                                </a>{" "}
                              </span>
                            </Fragment>
                          ))}{" "}
                      ({item.evidence_code})
                    </span>
                    <br />
                  </Fragment>
                ),
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableLeftData}>
              Cellular Component
            </TableCell>
            <TableCell className={classes.tableRightData}>
              {dataFilter(panelData.data.data[0], "cellular_component").map(
                (item, i) => (
                  <Fragment key={i}>
                    <span>
                      {item.goterm}
                      {item.with !== null &&
                        withDataFilter(item.with).map(
                          (xref: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>with</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(xref.id, xref.db)}
                                  target="_blank">
                                  {!xref.name && `${xref.db}:${xref.id}`}
                                  {xref.name && `${xref.name}`}
                                </a>
                              </span>
                            </Fragment>
                          ),
                        )}
                      {item.extensions !== null &&
                        item.extensions
                          .slice(0, 2)
                          .map((ext: Object, i: string) => (
                            <Fragment key={i}>
                              <span>
                                {" "}
                                <em>{ext.relation}</em>{" "}
                                <a
                                  className={classes.link}
                                  href={withLinkGenerator(ext.id, ext.db)}
                                  target="_blank">
                                  {!ext.name && `${ext.db}:${ext.id}`}
                                  {ext.name && `${ext.name}`}
                                </a>{" "}
                              </span>
                            </Fragment>
                          ))}{" "}
                      ({item.evidence_code})
                    </span>
                    <br />
                  </Fragment>
                ),
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(GoaPanel)
