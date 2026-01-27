import Button from "@mui/material/Button"
import { makeStyles } from "tss-react/mui"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles()(() => ({
  checkoutButton: {
    fontWeight: 1000,
    minHeight: "50px",
    "&:hover": {
      color: "#fff",
    },
  },
}))

const CheckoutButton = () => {
  const { classes } = useStyles()
  return (
    <Button
      component={Link}
      to="/order"
      color="secondary"
      variant="contained"
      size="large"
      fullWidth
      startIcon={<FontAwesomeIcon icon="shopping-cart" />}
      className={classes.checkoutButton}>
      Proceed to Checkout
    </Button>
  )
}

export { CheckoutButton }
