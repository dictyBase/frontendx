import { makeStyles } from "tss-react/mui"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useSetAtom } from "jotai"
import { orderStepAtom } from "../orderState"

const useStyles = makeStyles()((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    minWidth: "200px",
  },
}))

/**
 * BackButton displays the Back button on each page of the order form.
 */
const BackButton = () => {
  const { classes } = useStyles()
  const setOrderStep = useSetAtom(orderStepAtom)
  return (
    <Button
      color="inherit"
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
