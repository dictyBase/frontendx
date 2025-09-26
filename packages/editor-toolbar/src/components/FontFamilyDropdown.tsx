import { SelectChangeEvent, MenuItem } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { StyledSelect } from "./StyledSelect"
import { fontFamilyAtom, fonts, FontFamily } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"

const FontFamilyDropdown = () => {
  const [fontFamily] = useAtom(fontFamilyAtom)
  const [editor] = useLexicalComposerContext()

  const onFontFamilySelect = (event: SelectChangeEvent) => {
    applyTextStyles(editor, { "font-family": event.target.value as FontFamily })
  }

  return (
    <StyledSelect
      variant="standard"
      title="Font Family"
      onChange={onFontFamilySelect}
      value={fontFamily}>
      {fonts.map((option) => (
        <MenuItem key={option.name} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </StyledSelect>
  )
}

export { FontFamilyDropdown }
