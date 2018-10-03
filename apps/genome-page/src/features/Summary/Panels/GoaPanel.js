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

// Material-UI stylings
const styles = theme => ({
  root: {
    width: "100%",
  },
  table: {
    borderBottom: "1px dotted #A3BAE9",
  },
  tableLeftData: {
    backgroundColor: "#DFE8F6",
    minWidth: 150,
    maxWidth: 200,
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
                      {item.extensions !== null &&
                        item.extensions.map((ext: Object, i: string) => (
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
                      {/* {item.with !== null &&
                      item.with.map((item: Object) =>
                        item.connectedXrefs.map((xref: Object, i: string) => (
                          <Fragment key={i}>
                            <span>
                              {" "}
                              <em>with</em>{" "}
                              <a
                                className={classes.link}
                                href={withLinkGenerator(xref.id, xref.db)}
                                target="_blank">
                                {xref.db}:{xref.id}
                              </a>
                            </span>
                          </Fragment>
                        )),
                      )} */}
                      {item.extensions !== null &&
                        item.extensions.map((ext: Object, i: string) => (
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
                      {item.extensions !== null &&
                        item.extensions.map((ext: Object, i: string) => (
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
