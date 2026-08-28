import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableCellNode, TableRowNode, $findTableNode } from "@lexical/table"
import {
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_BEFORE_EDITOR,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  createCommand,
  KEY_ENTER_COMMAND,
} from "lexical"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  filter as Ofilter,
  match as Omatch,
  flatMap as OflatMap,
} from "fp-ts/Option"
import { match as Bmatch } from "fp-ts/boolean"
import { WidthTableNode } from "./WidthTableNode"
import { InsertWidthTable } from "./InsertWidthTable"

export const INSERT_WIDTH_TABLE_COMMAND = createCommand<{
  columns: number
  rows: number
  width: number
}>()

const findTableFromSelection = () =>
  pipe(
    $getSelection(),
    OfromNullable,
    Ofilter($isRangeSelection),
    Omap((selection) => selection.anchor.getNode()),
    Omap($findTableNode),
    OflatMap(OfromNullable),
  )

const handleShiftEnterInTable = (event: KeyboardEvent | null) => {
  if (!event?.shiftKey) return false

  return pipe(
    findTableFromSelection(),
    Omatch(
      () => false,
      (tableNode) => {
        const paragraphNode = $createParagraphNode()
        pipe(
          event.ctrlKey || event.metaKey,
          Bmatch(
            () => tableNode.insertAfter(paragraphNode),
            () => tableNode.insertBefore(paragraphNode),
          ),
        )
        paragraphNode.select()
        return true
      },
    ),
  )
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
