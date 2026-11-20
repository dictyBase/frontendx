import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useSetAtom } from "jotai"
import { orderStepAtom } from "../orderState"

/**
 * BackButton displays the Back button on each page of the order form.
 */
const BackButton = () => {
  const setOrderStep = useSetAtom(orderStepAtom)
  return (
    <Button
      color="inherit"
      size="large"
      variant="contained"
      sx={{ marginRight: 1, minWidth: "200px" }}
      startIcon={<KeyboardBackspaceIcon />}
      onClick={() => setOrderStep((previousStep) => previousStep - 1)}>
      Back
    </Button>
  )
}

export { BackButton }
