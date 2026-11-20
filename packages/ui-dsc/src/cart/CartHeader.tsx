import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

/**
 * ShoppingCartHeader displays text indicating the Cart page. It also uses the Helmet component to change the
 * the document head.
 */
const CartHeader = () => (
  <>
    <title>Shopping Cart - Dicty Stock Center</title>
    <meta
      name="description"
      content="Shopping cart page for Dicty Stock Center"
    />
    <Box marginTop={3} marginBottom={3}>
      <Typography variant="h1">Your Shopping Cart</Typography>
      <Divider sx={{ marginTop: 1 }} />
    </Box>
  </>
)

export { CartHeader }
