import { Button } from "@material-ui/core"
import useButtonStyles from "./useButtonStyles"
import useButtonState from "./useButtonState"
import { buttonColor, buttonIcon, buttonText } from "./buttonProperties"

type SaveButtonProperties = {
  handleSave: () => void
}
// I think we might have to pass in the onClick handler and
// handle the changing button state logic in the whichever persistenceplugin
// uses the savebutton. If our savehook callback is asynchronous, then we'll want
// to await that callback before proceeding to set the button state
const SaveButton = ({ handleSave }: SaveButtonProperties) => {
  const { root } = useButtonStyles()
  const [buttonState, onClick] = useButtonState(handleSave)

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
