import { pipe, A, F } from "@mobily/ts-belt"
import { $createParagraphNode, $createTextNode } from "lexical"
import {
  TableNode,
  TableRowNode,
  $createTableRowNode,
  $createTableCellNode,
  TableCellHeaderStates,
} from "@lexical/table"
import WidthTableNode from "./WidthTableNode"

export const createParagraphWithTextNode = () =>
  $createParagraphNode().append($createTextNode())

export const createCellWithParagraphNode = () =>
  $createTableCellNode(TableCellHeaderStates.NO_STATUS).append(
    createParagraphWithTextNode(),
  )

export const createHeaderCellWithParagraphNode = () =>
  $createTableCellNode(TableCellHeaderStates.ROW).append(
    createParagraphWithTextNode(),
  )

export const bodyCellsToAppend = (count: number) => (row: TableRowNode) => {
  Array.from({ length: count }).forEach(() =>
    row.append(createCellWithParagraphNode()),
  )
}

export const headerCellsToAppend = (count: number) => (row: TableRowNode) => {
  Array.from({ length: count }).forEach(() =>
    row.append(createHeaderCellWithParagraphNode()),
  )
}

export const cellsToAppend = (cells: number) => (rows: TableRowNode[]) => {
  if (rows.length === 0) return
  const headerCellFunction = headerCellsToAppend(cells)
  const bodyCellFunction = bodyCellsToAppend(cells)
  if (rows[0]) headerCellFunction(rows[0])
  pipe(rows, A.tailOrEmpty, A.tap(bodyCellFunction))
}

export const createRows = (rows: number) =>
  Array.from({ length: rows }).map(() => $createTableRowNode())

export const rowToAppend = (table: TableNode) => (row: TableRowNode) => {
  table.append(row)
}

const $createWidthTable = (
  rowCount: number,
  columnCount: number,
  width: number,
) => {
  const tableNode = new WidthTableNode(width)
  const cellFunction = cellsToAppend(columnCount)
  const rowFunction = rowToAppend(tableNode)
  pipe(rowCount, createRows, F.tap(cellFunction), A.tap(rowFunction))
  return tableNode
}

export default $createWidthTable
