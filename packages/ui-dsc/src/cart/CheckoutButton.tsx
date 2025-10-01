import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CheckoutButton = () => (
  <Button
    component={Link}
    to="/order"
    color="secondary"
    variant="contained"
    size="large"
    fullWidth
    startIcon={<FontAwesomeIcon icon="shopping-cart" />}
    sx={{
      fontWeight: 1000,
      minHeight: "50px",
      "&:hover": {
        color: "#fff",
      },
    }}>
    Proceed to Checkout
  </Button>
)

export { CheckoutButton }
