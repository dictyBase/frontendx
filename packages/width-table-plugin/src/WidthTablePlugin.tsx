import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { COMMAND_PRIORITY_EDITOR, createCommand } from "lexical"
import WidthTableNode from "./WidthTableNode"
import InsertWidthTable from "./InsertWidthTable"

export const INSERT_WIDTH_TABLE_COMMAND = createCommand<{
  columns: number
  rows: number
  width: number
}>()

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

    return () => {
      unregisterInsertTable()
    }
  }, [editor])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}

export default WidthTablePlugin
