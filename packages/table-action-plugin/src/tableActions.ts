import { $getNodeByKey, LexicalEditor, $getRoot } from "lexical"
import { pipe, flow } from "fp-ts/function"
import {
  map as Omap,
  fromNullable as OfromNullable,
  bindTo as ObindTo,
  filter as Ofilter,
  let as Olet,
  match as Omatch,
} from "fp-ts/Option"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $getElementForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
  $isTableCellNode,
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

const deleteTable = (editor: LexicalEditor, tableCellNodeKey: string) => {
  if (!tableCellNodeKey) return
  editor.update(() => {
    pipe(
      tableCellNodeKey,
      $getNodeByKey,
      OfromNullable,
      Omap((tableNode) => {
        tableNode.remove()
      }),
    )
  })
}

const getTableProperties = (editor: LexicalEditor) =>
  flow(
    $getNodeByKey,
    OfromNullable,
    ObindTo("tableCellNode"),
    Olet("tableNode", ({ tableCellNode }) =>
      pipe(tableCellNode as TableCellNode, $getTableNodeFromLexicalNodeOrThrow),
    ),
    Olet("tableRowNode", ({ tableCellNode }) =>
      pipe(tableCellNode as TableCellNode, $getTableRowIndexFromTableCellNode),
    ),
    Olet("grid", ({ tableNode }) => $getElementForTableNode(editor, tableNode)),
    Omap(({ grid, tableRowNode, tableNode }) => ({
      grid,
      tableRowNode,
      tableNode,
    })),
  )

const insertRow = (
  editor: LexicalEditor,
  tableCellNodeKey: string,
  { insertAfter }: { insertAfter: boolean },
) => {
  editor.update(() => {
    pipe(
      tableCellNodeKey,
      getTableProperties(editor),
      Omatch(
        () => {},
        ({ tableNode, tableRowNode, grid }) =>
          $insertTableRow(tableNode, tableRowNode, insertAfter, 1, grid),
      ),
    )
  })
}

const insertColumn = (
  editor: LexicalEditor,
  tableCellNodeKey: string,
  { insertAfter }: { insertAfter: boolean },
) => {
  editor.update(() => {
    pipe(
      tableCellNodeKey,
      getTableProperties(editor),
      Omatch(
        () => {},
        ({ tableNode, tableRowNode, grid }) =>
          $insertTableColumn(tableNode, tableRowNode, insertAfter, 1, grid),
      ),
    )
  })
}

const deleteRow = (editor: LexicalEditor, tableCellNodeKey: string) => {
  editor.update(() => {
    pipe(
      tableCellNodeKey,
      $getNodeByKey,
      OfromNullable,
      Ofilter($isTableCellNode),
      Omatch(
        () => {},
        (tableCellNode) => {
          $removeTableRowAtIndex(
            $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
            $getTableRowIndexFromTableCellNode(tableCellNode),
          )
          clearTableSelection(editor, tableCellNode)
        },
      ),
    )
  })
}

const deleteColumn = (editor: LexicalEditor, tableCellNodeKey: string) => {
  editor.update(() => {
    pipe(
      tableCellNodeKey,
      $getNodeByKey,
      OfromNullable,
      Ofilter($isTableCellNode),
      Omatch(
        () => {},
        (tableCellNode) => {
          $deleteTableColumn(
            $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
            $getTableRowIndexFromTableCellNode(tableCellNode),
          )
          clearTableSelection(editor, tableCellNode)
        },
      ),
    )
  })
}

export { deleteTable, insertColumn, insertRow, deleteRow, deleteColumn }
