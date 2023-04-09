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

/**
 * Creates ParagraphNode with a TextNode appended to it.
 *
 * @returns {ParagraphNode} A ParagraphNode with a TextNode appended to it.
 */
export const createParagraphWithTextNode = () =>
  $createParagraphNode().append($createTextNode())

/**
 * Creates a TableCellNode with a ParagraphNode containing a TextNode appended to it.
 *
 * @returns {TableCellNode} a TableCellNode with a ParagraphNode containing a TextNode appended to it.
 */
export const createCellWithParagraphNode = () =>
  $createTableCellNode(TableCellHeaderStates.NO_STATUS).append(
    createParagraphWithTextNode(),
  )

/**
 * Creates a Header TableCellNode with a ParagraphNode containing a TextNode appended to it.
 *
 * @returns {TableCellNode} a Header TableCellNode with a ParagraphNode containing a TextNode appended to it.
 */
export const createHeaderCellWithParagraphNode = () =>
  $createTableCellNode(TableCellHeaderStates.ROW).append(
    createParagraphWithTextNode(),
  )

/**
 * Generates a function to append a given number of TableCellNodes to a TableRowNode.
 *
 * @param {number} count - The number of cells to append to the row.
 * @returns {(row: TableRowNode) => void} A function that accepts a TableRowNode and appends the given number of cells to it.
 */
export const bodyCellsToAppend = (count: number) => (row: TableRowNode) => {
  Array.from({ length: count }).forEach(() =>
    row.append(createCellWithParagraphNode()),
  )
}

/**
 * Generates a function to append a given number of header TableCellNodes to a TableRowNode.
 *
 * @param {number} count - The number of cells to append to the row.
 * @returns {(row: TableRowNode) => void} A function that accepts a TableRowNode and appends the given number of cells to it.
 */
export const headerCellsToAppend = (count: number) => (row: TableRowNode) => {
  Array.from({ length: count }).forEach(() =>
    row.append(createHeaderCellWithParagraphNode()),
  )
}

/**
 * Generates a function to append a given number of cells (header and body) to an array of TableRowNodes.
 *
 * @param {number} cells - The total number of cells (header and body) to append.
 * @returns {(rows: TableRowNode[]) => void} A function that accepts an array of TableRowNodes and appends the specified number of header and body cells to each row.
 */
export const cellsToAppend = (cells: number) => (rows: TableRowNode[]) => {
  if (rows.length === 0) return
  const headerCellFunction = headerCellsToAppend(cells)
  const bodyCellFunction = bodyCellsToAppend(cells)
  if (rows[0]) headerCellFunction(rows[0])
  pipe(rows, A.tailOrEmpty, A.tap(bodyCellFunction))
}
/**
 * Creates an array of TableRowNodes with given length.
 *
 * @param {number} rows - The number of TableRowNodes to generate.
 * @returns {TableRowNode[]} An array of TableRowNodes.
 */
export const createRows = (rows: number) =>
  Array.from({ length: rows }).map(() => $createTableRowNode())

/**
 * Generates a function to append a TableRowNode to a TableNode.
 *
 * @param {TableNode} table - The TableNode to append rows onto.
 * @returns {(row: TableRowNode) => void} A function that accepts a TableRowNode to append to the table.
 */
export const rowToAppend = (table: TableNode) => (row: TableRowNode) => {
  table.append(row)
}

/**
 * Creates a WidthTableNode with given number of rows, columns, and width.
 *
 * @param {number} rows - The number of TableRowNodes to generate.
 * @param {number} columns - The number of table cell columns to generate.
 * @param {number} width - The width (px) of the table.
 * @returns {WidthTableNode} A WidthTableNode with given number of rows, columns, and width.
 */
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
