import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"

const useStyles = makeStyles(() => ({
  button: {
    minWidth: "200px",
  },
}))

/**
 * ContinueButton displays the continue button on each page of the order form.
 */
const ContinueButton = () => {
  const classes = useStyles()

  return (
    <Button
      aria-label="Continue"
      type="submit"
      size="large"
      color="secondary"
      variant="contained"
      endIcon={<ArrowRightAltIcon />}
      className={classes.button}>
      Continue
    </Button>
  )
}

export { ContinueButton }
