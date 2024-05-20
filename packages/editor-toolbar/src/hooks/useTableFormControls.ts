import { useState, ChangeEvent } from "react"
import { INSERT_WIDTH_TABLE_COMMAND } from "@dictybase/width-table-plugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useSetAtom } from "jotai"
import { insertTableDialogOpenAtom } from "../context/atomConfigs"

export type TextFieldProperties = {
  label: string
  value: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}[]

const calculateWidth = (columns: number) => 250 + Math.log(columns) * 500

const useTableFormControls = () => {
  const [editor] = useLexicalComposerContext()
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const setIsDialogOpen = useSetAtom(insertTableDialogOpenAtom)

  const handleChangeRows = (event: ChangeEvent<HTMLInputElement>) => {
    setRows(Number.parseInt(event.target.value, 10) || 0)
  }

  const handleChangeColumns = (event: ChangeEvent<HTMLInputElement>) => {
    setColumns(Number.parseInt(event.target.value, 10) || 0)
  }

  const handleConfirm = () => {
    editor.dispatchCommand(INSERT_WIDTH_TABLE_COMMAND, {
      rows,
      columns,
      width: calculateWidth(columns),
    })
    setIsDialogOpen(false)
  }

  const textFieldProperties: TextFieldProperties = [
    { label: "Rows", value: rows, onChange: handleChangeRows },
    { label: "Columns", value: columns, onChange: handleChangeColumns },
  ]

  return { rows, columns, textFieldProperties, handleConfirm }
}

export { useTableFormControls }
