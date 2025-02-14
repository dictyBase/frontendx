import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontFamilyAtom, fonts, FontFamily } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"

type FontFamilySelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const FontFamilyDropdown = () => {
  const [fontFamily] = useAtom(fontFamilyAtom)
  const [editor] = useLexicalComposerContext()
  const classes = useToolbarItemStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const onFontFamilySelect = (event: FontFamilySelectProperties) => {
    applyTextStyles(editor, { "font-family": event.target.value as FontFamily })
  }

  return (
    <Select
      title="Font Family"
      className={joinedClasses}
      onChange={onFontFamilySelect}
      value={fontFamily}>
      {fonts.map((option) => (
        <MenuItem key={option.name} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export { FontFamilyDropdown }
