import { Select, SelectChangeEvent, MenuItem } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { fontSizeAtom } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"

type FontSizeDropdownProperties = {
  start?: number
  end?: number
}

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

  const onFontSizeSelect = (event: SelectChangeEvent) => {
    applyTextStyles(editor, { "font-size": event.target.value as string })
  }
  return (
    <Select
      variant="standard"
      title={title}
      sx={{ ...classes.root, ...classes.spaced }}
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
