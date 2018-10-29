// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    width: "100%",
  },
  table: {
    borderBottom: "1px dotted #A3BAE9",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Children passed to component */
  children: any,
}

/**
 * This is a basic table wrapper that uses Material-UI for the design.
 * It is used inside every panel on the gene summary page.
 */

const TableWrapper = ({ classes, children }: Props) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableBody>{children}</TableBody>
    </Table>
  </Paper>
)

export default withStyles(styles)(TableWrapper)
