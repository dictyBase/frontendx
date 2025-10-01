import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"

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
}: AddToCartDialogActionsProperties) => (
  <DialogActions>
    <Button
      onClick={handleClose}
      variant="outlined"
      color="primary"
      aria-label="Continue Shopping">
      Continue Shopping
    </Button>
    <Button
      onClick={handleClose}
      component={Link}
      to="/cart"
      sx={(theme) => ({
        "&:hover": {
          color: theme.palette.primary.contrastText,
        },
      })}
      variant="contained"
      color="secondary"
      aria-label="View Cart">
      View Cart
    </Button>
  </DialogActions>
)

export { AddToCartDialogActions }
