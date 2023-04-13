import { LexicalEditor, $getRoot } from "lexical"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $getTableColumnIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
} from "@lexical/table"

const clearTableSelection = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode,
) => {
  if (tableCellNode && tableCellNode.isAttached()) return
  editor.update(() => {
    const rootNode = $getRoot()
    rootNode.selectStart()
  })
}

export const deleteTable = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | undefined,
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    tableNode.remove()
  })
}

export const insertRow = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | undefined,
  { insertAfter }: { insertAfter: boolean },
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    const row = $getTableRowIndexFromTableCellNode(tableCellNode)
    const grid = $getElementGridForTableNode(editor, tableNode)
    $insertTableRow(tableNode, row, insertAfter, 1, grid)
  })
}
export const insertColumn = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | undefined,
  { insertAfter }: { insertAfter: boolean },
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    const column = $getTableColumnIndexFromTableCellNode(tableCellNode)
    const grid = $getElementGridForTableNode(editor, tableNode)
    $insertTableColumn(tableNode, column, insertAfter, 1, grid)
  })
}

export const deleteRow = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | undefined,
) => {
  editor.update(() => {
    if (!tableCellNode) return
    $removeTableRowAtIndex(
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
      $getTableRowIndexFromTableCellNode(tableCellNode),
    )
    clearTableSelection(editor, tableCellNode)
  })
}

export const deleteColumn = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | undefined,
) => {
  if (!tableCellNode) return
  editor.update(() => {
    $deleteTableColumn(
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
      $getTableColumnIndexFromTableCellNode(tableCellNode),
    )
    clearTableSelection(editor, tableCellNode)
  })
}
