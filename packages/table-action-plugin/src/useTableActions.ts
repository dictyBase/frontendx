import { $getNodeByKey, LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getTableNodeFromLexicalNodeOrThrow,
  $getElementForTableNode,
} from "@lexical/table"
import { useAtomValue, useSetAtom, SetStateAction } from "jotai"
import { pipe } from "fp-ts/function"
import {
  selectedTableCellNodeKey,
  tableActionMenuOpenAtom,
} from "./atomConfigs"
import {
  deleteTable,
  insertRow,
  insertColumn,
  deleteRow,
  deleteColumn,
} from "./tableActions"

const useTableActionContext = (): [
  LexicalEditor,
  string | undefined,
  (update: SetStateAction<boolean>) => void,
] => [
  useLexicalComposerContext()[0],
  useAtomValue(selectedTableCellNodeKey),
  useSetAtom(tableActionMenuOpenAtom),
]

const useDeleteTable = () => {
  const [editor, tableCellNodeKey, setIsOpen] = useTableActionContext()
  return () => {
    if (!tableCellNodeKey) return
    deleteTable(editor, tableCellNodeKey)
    setIsOpen(false)
  }
}

const useInsertRow = () => {
  const [editor, tableCellNodeKey, setIsOpen] = useTableActionContext()

  const insertRowAbove = () => {
    if (!tableCellNodeKey) return
    insertRow(editor, tableCellNodeKey, { insertAfter: false })
    setIsOpen(false)
  }

  const insertRowBelow = () => {
    if (!tableCellNodeKey) return
    insertRow(editor, tableCellNodeKey, { insertAfter: true })
    setIsOpen(false)
  }

  return {
    insertRowAbove,
    insertRowBelow,
  }
}

const useInsertColumn = () => {
  const [editor, tableCellNodeKey, setIsOpen] = useTableActionContext()

  const insertColumnLeft = () => {
    if (!tableCellNodeKey) return
    insertColumn(editor, tableCellNodeKey, { insertAfter: false })
    setIsOpen(false)
  }

  const insertColumnRight = () => {
    if (!tableCellNodeKey) return
    insertColumn(editor, tableCellNodeKey, { insertAfter: true })
    setIsOpen(false)
  }

  return { insertColumnLeft, insertColumnRight }
}
const useDeleteColumn = () => {
  const [editor, tableCellNodeKey, setIsOpen] = useTableActionContext()

  return () => {
    if (!tableCellNodeKey) return
    deleteColumn(editor, tableCellNodeKey)
    setIsOpen(false)
  }
}

const useDeleteRow = () => {
  const [editor, tableCellNodeKey, setIsOpen] = useTableActionContext()

  return () => {
    if (!tableCellNodeKey) return
    deleteRow(editor, tableCellNodeKey)
    setIsOpen(false)
  }
}

const useDisableFunctions = () => {
  const [editor, tableCellNodeKey] = useTableActionContext()
  let deleteRowDisabled = true
  let deleteColumnDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNodeKey) return
    const tableCellNode = pipe(
      tableCellNodeKey,
      $getNodeByKey,
      $getTableNodeFromLexicalNodeOrThrow,
    )

    const grid = $getElementForTableNode(
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

export {
  useDeleteTable,
  useInsertRow,
  useInsertColumn,
  useDeleteColumn,
  useDeleteRow,
  useDisableFunctions,
}
