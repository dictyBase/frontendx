import { Link } from "react-router-dom"
import { makeStyles } from "tss-react/mui"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"

const buttonStyles = {
  minWidth: "250px",
  marginRight: "20px",
}

/**
 * EmptyCart is the display for the cart page when there are
 * no items in the cart.
 */
const EmptyCart = () => (
  <>
    <Box marginTop={4} marginBottom={4}>
      <Typography variant="body1">
        Your shopping cart is empty. Please add at least one item to your cart
        before checking out.
      </Typography>
    </Box>
    <Typography variant="h2">Browse our catalogs</Typography>
    <Box marginTop={4} marginBottom={3}>
      <Button
        sx={buttonStyles}
        color="primary"
        variant="contained"
        component={Link}
        to="/catalog">
        Full Catalog
      </Button>
      <Button
        sx={buttonStyles}
        color="primary"
        variant="contained"
        component={Link}
        to="/strains">
        Browse Strains
      </Button>
      <Button
        sx={buttonStyles}
        color="primary"
        variant="contained"
        component={Link}
        to="/plasmids">
        Browse Plasmids
      </Button>
    </Box>
    <Divider />
  </>
)

export { EmptyCart }
