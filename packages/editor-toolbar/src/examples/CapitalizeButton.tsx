import { Button } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAPITALIZE_SELECTION_COMMAND } from "./capitalizeCommand"

const CapitalizeButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    editor.dispatchCommand(CAPITALIZE_SELECTION_COMMAND, undefined)
  }
  return <Button onClick={onClick}> Capitalize </Button>
}

export { CapitalizeButton }
