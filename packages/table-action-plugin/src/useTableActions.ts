import { LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getElementGridForTableNode,
} from "@lexical/table"
import { useAtomValue, useSetAtom, SetStateAction } from "jotai"
import { selectedTableCellNode, tableActionMenuOpenAtom } from "./atomConfigs"
import {
  deleteTable,
  insertRow,
  insertColumn,
  deleteRow,
  deleteColumn,
} from "./tableActions"

const useTableActionContext = (): [
  LexicalEditor,
  TableCellNode | undefined,
  (update: SetStateAction<boolean>) => void,
] => [
  useLexicalComposerContext()[0],
  useAtomValue(selectedTableCellNode),
  useSetAtom(tableActionMenuOpenAtom),
]

export const useDeleteTable = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()
  return () => {
    deleteTable(editor, tableCellNode)
    setIsOpen(false)
  }
}

export const useInsertRow = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  const insertRowAbove = () => {
    insertRow(editor, tableCellNode, { insertAfter: false })
    setIsOpen(false)
  }

  const insertRowBelow = () => {
    insertRow(editor, tableCellNode, { insertAfter: true })
    setIsOpen(false)
  }

  return {
    insertRowAbove,
    insertRowBelow,
  }
}

export const useInsertColumn = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  const insertColumnLeft = () => {
    insertColumn(editor, tableCellNode, { insertAfter: false })
    setIsOpen(false)
  }

  const insertColumnRight = () => {
    insertColumn(editor, tableCellNode, { insertAfter: true })
    setIsOpen(false)
  }

  return { insertColumnLeft, insertColumnRight }
}
export const useDeleteColumn = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  return () => {
    deleteColumn(editor, tableCellNode)
    setIsOpen(false)
  }
}

export const useDeleteRow = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  return () => {
    deleteRow(editor, tableCellNode)
    setIsOpen(false)
  }
}

export const useDisableFunctions = () => {
  const [editor, tableCellNode] = useTableActionContext()
  let deleteRowDisabled = true
  let deleteColumnDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteRowDisabled = grid.rows === 1
    deleteColumnDisabled = grid.columns === 1
  })

  return {
    deleteRowDisabled,
    deleteColumnDisabled,
  }
}
