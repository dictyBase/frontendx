import React from "react"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"

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
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ backgroundColor: "#e6f2ff" }}>
      <TableRow>
        {columnData.map((column) => (
          <TableCell
            key={column.id}
            sx={{ color: "#333", fontWeight: 600 }}
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

export { EnhancedTableHead }
