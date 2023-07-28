import { Link } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"

const useStyles = makeStyles((theme: Theme) => ({
  cartDialogButton: {
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
  },
}))

type AddToCartDialogActionsProperties = {
  /** Function called when closing the dialog box */
  handleClose: () => void
}

/**
 * AddToCartDialogActions is the display for the action buttons at the bottom
 * of the cart dialog box.
 */

const AddToCartDialogActions = ({
  handleClose,
}: AddToCartDialogActionsProperties) => {
  const classes = useStyles()

  return (
    <DialogActions>
      <Button
        onClick={handleClose}
        variant="outlined"
        color="default"
        aria-label="Continue Shopping">
        Continue Shopping
      </Button>
      <Button
        onClick={handleClose}
        component={Link}
        to="/cart"
        className={classes.cartDialogButton}
        variant="contained"
        color="secondary"
        aria-label="View Cart">
        View Cart
      </Button>
    </DialogActions>
  )
}

export { AddToCartDialogActions }
