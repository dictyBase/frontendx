import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import { useSetAtom } from "jotai"
import { orderStepAtom } from "../orderState"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(1),
    minWidth: "200px",
  },
}))

/**
 * BackButton displays the Back button on each page of the order form.
 */
const BackButton = () => {
  const classes = useStyles()
  const setOrderStep = useSetAtom(orderStepAtom)
  return (
    <Button
      color="default"
      size="large"
      variant="contained"
      className={classes.button}
      startIcon={<KeyboardBackspaceIcon />}
      onClick={() => setOrderStep((previousStep) => previousStep - 1)}>
      Back
    </Button>
  )
}

export { BackButton }
