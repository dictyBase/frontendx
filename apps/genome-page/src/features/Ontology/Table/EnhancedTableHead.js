// @flow
import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"

const columnData = [
  {
    id: "goterm",
    label: "GO Term + Extension",
  },
  { id: "evidence_code", label: "Evidence" },
  { id: "with", label: "With" },
  {
    id: "publication",
    label: "Reference",
  },
  { id: "date", label: "Date" },
  { id: "assigned_by", label: "Source" },
]

const styles = () => ({
  head: {
    backgroundColor: "#DFE8F6",
  },
  headerCell: {
    color: "#333",
    fontWeight: "600",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The order to sort the column */
  order: string,
  /** The item to be ordered by */
  orderBy: string,
  /** Function for handling sorting */
  onRequestSort: Function,
}

/**
 * Enhanced table head component that allows for column sorting.
 */

class EnhancedTableHead extends Component<Props> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, classes } = this.props

    return (
      <TableHead className={classes.head}>
        <TableRow>
          {columnData.map((column: Object) => {
            return (
              <TableCell
                key={column.id}
                className={classes.headerCell}
                sortDirection={orderBy === column.id ? order : false}>
                {/* $FlowFixMe */}
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

export default withStyles(styles)(EnhancedTableHead)
