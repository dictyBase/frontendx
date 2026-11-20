import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"
import { GoAnnotation } from "dicty-graphql-schema"
import { EnhancedTableHead } from "./EnhancedTableHead"
import { GoaDisplayTableRow } from "./GoaDisplayTableRow"
import { getSorting } from "../utils/getSorting"

type Order = "asc" | "desc"

type Properties = {
  /** GO Annotations */
  data: GoAnnotation[]
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const GoaDisplayTable = ({ data }: Properties) => {
  const [tableOrder, setTableOrder] = React.useState<Order>("desc")
  const [tableSortBy, setTableSortBy] = React.useState("date")

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GoAnnotation,
  ) => {
    const isAsc = tableSortBy === property && tableOrder === "asc"
    setTableOrder(isAsc ? "desc" : "asc")
    setTableSortBy(property)
  }

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <EnhancedTableHead
          order={tableOrder}
          orderBy={tableSortBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {data
            .sort(getSorting(tableOrder, tableSortBy))
            .map((item: GoAnnotation, index: number) => (
              // eslint-disable-next-line react/no-array-index-key -- passing index as key is necessary for sorting, for some reason. Maybe because .sort mutates the array in place?
              <GoaDisplayTableRow key={index} item={item} />
            ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export { GoaDisplayTable }
