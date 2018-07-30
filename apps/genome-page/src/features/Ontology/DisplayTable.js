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
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
})

const DisplayTable = props => {
  const { classes, data } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>GO Term + Extension</TableCell>
            <TableCell>Evidence</TableCell>
            <TableCell>With</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={item.index}>
                <TableCell component="th" scope="row">
                  {item.term}
                </TableCell>
                <TableCell>{item.evidence}</TableCell>
                <TableCell>{item.with}</TableCell>
                <TableCell>{item.reference}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.source}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(DisplayTable)
