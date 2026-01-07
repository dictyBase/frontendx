import { Link } from "react-router-dom"
import { Theme } from "@mui/material/styles";
import { makeStyles } from 'tss-react/mui';
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"

const useStyles = makeStyles()((theme: Theme) => ({
  cartDialogButton: {
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

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
  const { classes } = useStyles()

  return (
    (<DialogActions>
      <Button onClick={handleClose} variant="outlined" aria-label="Continue Shopping">
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
    </DialogActions>)
  );
}

export { AddToCartDialogActions }
