import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@mui/material"
import { FormatItalic } from "@mui/icons-material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isItalicAtom } from "../context/atomConfigs"
import { useActiveClass } from "../hooks/useActiveClass"

const title = "Format Italic"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonStyle = useActiveClass(isItalicAtom)

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      sx={buttonStyle}
      size="large">
      <FormatItalic fontSize="small" />
    </IconButton>
  )
}

export { FormatItalicButton }
