import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontFamilyAtom, fontFamilyOptions } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"

type FontFamilySelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const title = "Font Family"

const FontFamilyDropdown = () => {
  const [fontFamily] = useAtom(fontFamilyAtom)
  const [editor] = useLexicalComposerContext()
  const classes = useToolbarItemStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const onFontFamilySelect = (event: FontFamilySelectProperties) => {
    console.log(event.target.value)
    applyTextStyles(editor, { "font-family": event.target.value as string })
  }
  console.log(fontFamily)
  return (
    <Select
      title={title}
      className={joinedClasses}
      onChange={onFontFamilySelect}
      value={fontFamily.value}>
      {fontFamilyOptions.map((option) => (
        <MenuItem key={option.name} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export { FontFamilyDropdown }
