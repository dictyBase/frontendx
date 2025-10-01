import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"

/**
 * EmptyCart is the display for the cart page when there are
 * no items in the cart.
 */
const EmptyCart = () => {
  return (
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
          sx={{
            minWidth: "250px",
            marginRight: "20px",
          }}
          color="primary"
          variant="outlined"
          component={Link}
          to="/strains">
          Strain Catalog
        </Button>
        <Button
          sx={{
            minWidth: "250px",
            marginRight: "20px",
          }}
          color="primary"
          variant="outlined"
          component={Link}
          to="/plasmids">
          Plasmid Catalog
        </Button>
      </Box>
      <Divider />
    </>
  )
}

export { EmptyCart }
