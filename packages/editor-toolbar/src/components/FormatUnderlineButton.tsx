import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@mui/material"
import { FormatUnderlined } from "@mui/icons-material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isUnderlinedAtom } from "../context/atomConfigs"
import { useActiveClass } from "../hooks/useActiveClass"

const title = "Format Underline"

const FormatUnderlineButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonStyle = useActiveClass(isUnderlinedAtom)

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }}
      sx={buttonStyle}
      size="large">
      <FormatUnderlined fontSize="small" />
    </IconButton>
  )
}

export { FormatUnderlineButton }
