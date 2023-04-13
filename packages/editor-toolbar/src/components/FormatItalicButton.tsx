import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isItalicAtom } from "../context/atomConfigs"
import useActiveClass from "../hooks/useActiveClass"

const title = "Format Italic"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isItalicAtom)

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      className={buttonClass}>
      <FormatItalic fontSize="small" />
    </IconButton>
  )
}

export default FormatItalicButton
