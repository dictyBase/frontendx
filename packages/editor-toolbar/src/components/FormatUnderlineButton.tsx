import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isUnderlinedAtom } from "../context/atomConfigs"
import useActiveClass from "../hooks/useActiveClass"

const title = "Format Underline"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isUnderlinedAtom)

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }}
      className={buttonClass}>
      <FormatUnderlined fontSize="small" />
    </IconButton>
  )
}

export default FormatUnderlinedButton
