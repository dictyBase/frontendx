import { useState } from "react"
import ButtonStates from "./ButtonStates"

const useButtonState = (handleSave: () => void): [ButtonStates, () => void] => {
  const [buttonState, setButtonState] = useState<ButtonStates>("NORMAL")

  return [
    buttonState,
    () => {
      // A better solution would probably be to set the button's state to disabled
      // when in the DONE or ERROR state, and override MUI's default styling for
      // a disabled button.
      if (buttonState !== "NORMAL") return

      setButtonState("LOADING")
      try {
        handleSave()
        setButtonState("DONE")
      } catch {
        setButtonState("ERROR")
      } finally {
        setTimeout(() => {
          setButtonState("NORMAL")
        }, 2000)
      }
    },
  ]
}

export default useButtonState
