// @flow
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
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** GOA data fetched from QuickGO API */
  goaData: Array<Object>,
}

const DisplayTable = (props: Props) => {
  const { classes, goaData } = props

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>GO Term + Extension</TableCell>
            <TableCell>Evidence</TableCell>
            <TableCell>With</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Date</TableCell>
            {/* <TableCell>Source</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {goaData.map((item: Object, index: string) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.attributes.goterm}
                </TableCell>
                <TableCell>{item.attributes.evidence_code}</TableCell>
                <TableCell>null</TableCell>
                <TableCell>{item.attributes.publication}</TableCell>
                <TableCell>{item.attributes.date}</TableCell>
                {/* <TableCell>{item.attributes.source}</TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(DisplayTable)
