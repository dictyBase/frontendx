import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import EnhancedTableHead from "./EnhancedTableHead"
import GoaDisplayTableRow from "./GoaDisplayTableRow"
import getSorting from "./utils/getSorting"
import { GoAnnotation } from "dicty-graphql-schema"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
  headerCell: {
    color: "#333",
    fontWeight: 600,
  },
})

type Order = "asc" | "desc"

type Props = {
  /** GO Annotations */
  data: GoAnnotation[]
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const GoaDisplayTable = ({ data }: Props) => {
  const [tableOrder, setTableOrder] = React.useState<Order>("desc")
  const [tableSortBy, setTableSortBy] = React.useState("date")
  const classes = useStyles()

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GoAnnotation,
  ) => {
    const isAsc = tableSortBy === property && tableOrder === "asc"
    setTableOrder(isAsc ? "desc" : "asc")
    setTableSortBy(property)
  }

  return (
    <Paper className={classes.root}>
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
              <GoaDisplayTableRow key={index} item={item} />
            ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default GoaDisplayTable
