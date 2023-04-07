import { $isTableRowNode, $isTableCellNode } from "@lexical/table"
import WidthTableNode from "./WidthTableNode"

/**
 * Selects the first cell of the first row in a given tableNode
 * @param {WidthTableNode} tableNode - The node representing a table within the editor
 */
export const selectFirstTableCell = (tableNode: WidthTableNode) => {
  const firstRow = tableNode.getFirstChildOrThrow()
  if (!$isTableRowNode(firstRow)) return
  const firstCell = firstRow.getFirstChildOrThrow()
  if (!$isTableCellNode(firstCell)) return
  firstCell.select()
}
