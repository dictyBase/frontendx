import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  tableHeader: {
    backgroundColor: "#4C5E81",
    color: "#fff",
    fontSize: "1.2em",
  },
  tableLeftData: {
    backgroundColor: "#DFE8F6",
    width: "20%",
  },
  tableRightData: {
    width: "80%",
  },
})

const Links = props => {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Links</TableCell>
            <TableCell className={classes.tableHeader} />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableLeftData}>
              External Links
            </TableCell>
            <TableCell className={classes.tableRightData}>
              <a href="#test">UniProtKB: Q86JM7</a>&nbsp;
              <a href="#test">GenBank Protein</a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(Links)
