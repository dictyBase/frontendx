import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@mui/material"
import { FormatBold } from "@mui/icons-material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "../context/atomConfigs"
import { useActiveClass } from "../hooks/useActiveClass"

const title = "Format Bold"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonStyle = useActiveClass(isBoldAtom)

  return (
    (<IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      sx={buttonStyle}
      size="large">
      <FormatBold fontSize="small" />
    </IconButton>)
  );
}

export { FormatBoldButton }
