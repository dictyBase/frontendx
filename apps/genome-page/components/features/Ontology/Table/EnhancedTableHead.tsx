import React from "react"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import useStyles from "../../../../styles/displayTableStyles"

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

const EnhancedTableHead = ({ onRequestSort, order, orderBy }: any) => {
  const classes = useStyles()

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {columnData.map((column) => (
          <TableCell
            key={column.id}
            className={classes.headerCell}
            sortDirection={orderBy === column.id ? order : false}>
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={createSortHandler(column.id)}>
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
