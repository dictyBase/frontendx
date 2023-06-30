import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    fontWeight: 1000,
    minHeight: "50px",
    "&:hover": {
      color: "#fff",
    },
  },
}))

const CheckoutButton = () => {
  const { checkoutButton } = useStyles()
  return (
    <Button
      component={Link}
      to="/order/checkout"
      color="secondary"
      variant="contained"
      size="large"
      fullWidth
      startIcon={<FontAwesomeIcon icon="shopping-cart" />}
      className={checkoutButton}>
      Proceed to Checkout
    </Button>
  )
}

export { CheckoutButton }
