import { Button } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useButtonStyles from "./useButtonStyles"
import useButtonState from "./useButtonState"
import { buttonColor, buttonIcon, buttonText } from "./buttonProperties"
import { SAVE_LOCAL_COMMAND } from "./LocalPersistencePlugin"

type SaveButtonProperties = {
  handleSave: (value: string) => void
}
// I think we might have to pass in the onClick handler and
// handle the changing button state logic in the whichever persistenceplugin
// uses the savebutton. If our savehook callback is asynchronous, then we'll want
// to await that callback before proceeding to set the button state
const SaveButton = ({ handleSave }: SaveButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const { root } = useButtonStyles()
  const [buttonState, onClick] = useButtonState(() => {
    editor.dispatchCommand(SAVE_LOCAL_COMMAND, {})
    handleSave(JSON.stringify(editor.getEditorState().toJSON()))
  })

  return (
    <Button
      className={root}
      variant="contained"
      color={buttonColor[buttonState]}
      disabled={buttonState === "LOADING"}
      onClick={onClick}
      startIcon={buttonIcon[buttonState]}>
      {buttonText[buttonState]}
    </Button>
  )
}

export default SaveButton
