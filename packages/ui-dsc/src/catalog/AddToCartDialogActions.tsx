import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "tss-react/mui"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"

const useStyles = makeStyles()((theme: Theme) => ({
  cartDialogButton: {
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
  },
}))

type AddToCartDialogActionsProperties = {
  /** Function called when closing the dialog box */
  handleClose: MouseEventHandler<HTMLButtonElement>
}

/**
 * AddToCartDialogActions is the display for the action buttons at the bottom
 * of the cart dialog box.
 */

const AddToCartDialogActions = ({
  handleClose,
}: AddToCartDialogActionsProperties) => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const onViewCart: MouseEventHandler = (event) => {
    event.stopPropagation()
    navigate("/cart")
  }

  return (
    <DialogActions>
      <Button
        onClick={handleClose}
        variant="contained"
        aria-label="Continue Shopping">
        Continue Shopping
      </Button>
      <Button
        onClick={onViewCart}
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
