import { $getSelection, $isRangeSelection } from "lexical"
import { selectFirstTableCell } from "./helpers"
import $createWidthTable from "./$createWidthTable"

type InsertWidthTablePayload = {
  columns: number
  rows: number
  width: number
}

/**
 * Inserts a new table with specified number of rows and columns, and width of the table.
 *
 * @param columns number of columns for the new table.
 * @param rows number of rows for the new table.
 * @param width width of the new table.
 * @returns true if the table is inserted successfully; otherwise false.
 */
const InsertWidthTable = ({
  columns,
  rows,
  width,
}: InsertWidthTablePayload) => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return true

  const { focus } = selection
  const focusNode = focus.getNode()
  if (!focusNode) return true

  const tableNode = $createWidthTable(rows, columns, width)
  const topLevelNode = focusNode.getTopLevelElementOrThrow()

  topLevelNode.insertAfter(tableNode)
  selectFirstTableCell(tableNode)

  return true
}

export default InsertWidthTable
