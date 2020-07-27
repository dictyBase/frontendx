import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"

import styles from "./DisplayTableStyles"

const columnData = [
  {
    id: "qualifier",
    label: "Qualifier + GO Term",
  },
  { id: "extensions", label: "Extensions" },
  { id: "evidence_code", label: "Evidence" },
  { id: "with", label: "With" },
  {
    id: "publication",
    label: "Reference",
  },
  { id: "date", label: "Date" },
  { id: "assigned_by", label: "Source" },
]

/**
 * Enhanced table head component that allows for column sorting.
 */

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, classes } = this.props

    return (
      <TableHead className={classes.head}>
        <TableRow>
          {columnData.map(
            (column) => (
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
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

export default withStyles(styles)(EnhancedTableHead)
