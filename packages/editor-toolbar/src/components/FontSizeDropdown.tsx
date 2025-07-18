import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { fontSizeAtom } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"

type FontSizeDropdownProperties = {
  start?: number
  end?: number
}

type FontSizeSelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const title = "Font Size"

const genFontSize = (start: number, end: number) =>
  [...Array.from({ length: end - start + 1 }).keys()]
    .map((x) => x + start)
    .map((x) => ({ value: `${x}px`, label: `${x}` }))

const FontSizeDropdown = ({
  start = 10,
  end = 20,
}: FontSizeDropdownProperties) => {
  const [editor] = useLexicalComposerContext()
  const fontSize = useAtomValue(fontSizeAtom)
  const classes = useToolbarItemStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const onFontSizeSelect = (event: FontSizeSelectProperties) => {
    applyTextStyles(editor, { "font-size": event.target.value as string })
  }
  return (
    <Select
      title={title}
      className={joinedClasses}
      onChange={onFontSizeSelect}
      value={fontSize}>
      {genFontSize(start, end).map(({ value, label }) => (
        <MenuItem key={label} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}

export { FontSizeDropdown }
