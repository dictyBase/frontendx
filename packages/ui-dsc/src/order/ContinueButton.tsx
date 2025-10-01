import Button from "@mui/material/Button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

/**
 * ContinueButton displays the continue button on each page of the order form.
 */
const ContinueButton = () => {
  return (
    <Button
      aria-label="Continue"
      type="submit"
      size="large"
      color="secondary"
      variant="contained"
      endIcon={<ArrowRightAltIcon />}
      sx={{ minWidth: "200px" }}>
      Continue
    </Button>
  )
}

export { ContinueButton }
