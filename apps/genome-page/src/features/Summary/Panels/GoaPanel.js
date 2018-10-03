// @flow
import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import withLinkGenerator from "features/Ontology/utils/withLinkGenerator"

// set variables that represent filtered arrays for use in each row
const molecular = arr =>
  arr
    .filter(item => item.type === "molecular_function")
    .map(item => item.attributes)
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

const biological = arr =>
  arr
    .filter(item => item.type === "biological_process")
    .map(item => item.attributes)
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)
const cellular = arr =>
  arr
    .filter(item => item.type === "cellular_component")
    .map(item => item.attributes)
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

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
              {molecular(panelData.data.data[0]).map(
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
              {biological(panelData.data.data[0]).map((item, i) => (
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
              ))}
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
              {cellular(panelData.data.data[0]).map((item, i) => (
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
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(GoaPanel)
