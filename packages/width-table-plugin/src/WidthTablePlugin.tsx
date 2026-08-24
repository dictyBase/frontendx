import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableCellNode, TableRowNode, $findTableNode } from "@lexical/table"
import {
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_BEFORE_EDITOR,
  createCommand,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  KEY_ENTER_COMMAND,
} from "lexical"
import { WidthTableNode } from "./WidthTableNode"
import { InsertWidthTable } from "./InsertWidthTable"

export const INSERT_WIDTH_TABLE_COMMAND = createCommand<{
  columns: number
  rows: number
  width: number
}>()

const handleShiftEnterInTable = (event: KeyboardEvent | null) => {
  if (!event?.shiftKey) return false

  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return false

  const tableNode = $findTableNode(selection.anchor.getNode())
  if (!tableNode) return false

  const paragraphNode = $createParagraphNode()
  if (event.ctrlKey || event.metaKey) {
    tableNode.insertBefore(paragraphNode)
  } else {
    tableNode.insertAfter(paragraphNode)
  }
  paragraphNode.select()

  return true
}

const WidthTablePlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (!editor.hasNodes([WidthTableNode, TableCellNode, TableRowNode])) {
      throw new Error(
        `TablePlugin: TableNode, TableCellNode or TableRowNode not registered on editor`,
      )
    }
    const unregisterInsertTable = editor.registerCommand(
      INSERT_WIDTH_TABLE_COMMAND,
      InsertWidthTable,
      COMMAND_PRIORITY_EDITOR,
    )

    const unregisterShiftEnter = editor.registerCommand(
      KEY_ENTER_COMMAND,
      handleShiftEnterInTable,
      COMMAND_PRIORITY_BEFORE_EDITOR,
    )

    return () => {
      unregisterInsertTable()
      unregisterShiftEnter()
    }
  }, [editor])

  return <></>
}

export { WidthTablePlugin }
