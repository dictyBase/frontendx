// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

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
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Fetched GOA data */
  data: Array<Object>,
}

/**
 * Panel to display Gene Ontology Annotations in Gene Summary tab
 */

const GoaPanel = (props: Props) => {
  const { classes, data } = props

  // set variables that represent filtered arrays for use in each row
  const molecular = data.filter(item => item.type === "molecular_function")
  const biological = data.filter(item => item.type === "biological_process")
  const cellular = data.filter(item => item.type === "cellular_component")

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
              {molecular.map((item, i) => {
                if (molecular.length === i + 1) {
                  return `${item.attributes.goterm} (${
                    item.attributes.evidence_code
                  })`
                }
                return `${item.attributes.goterm} (${
                  item.attributes.evidence_code
                }), `
              })}
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
              {biological.map((item, i) => {
                if (biological.length === i + 1) {
                  return `${item.attributes.goterm} (${
                    item.attributes.evidence_code
                  })`
                }
                return `${item.attributes.goterm} (${
                  item.attributes.evidence_code
                }), `
              })}
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
              {cellular.map((item, i) => {
                if (cellular.length === i + 1) {
                  return `${item.attributes.goterm} (${
                    item.attributes.evidence_code
                  })`
                }
                return `${item.attributes.goterm} (${
                  item.attributes.evidence_code
                }), `
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(GoaPanel)
