import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(() => ({
  button: {
    minWidth: "250px",
    marginRight: "20px",
  },
}))

/**
 * EmptyCart is the display for the cart page when there are
 * no items in the cart.
 */
const EmptyCart = () => {
  const classes = useStyles()
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
          className={classes.button}
          color="primary"
          variant="outlined"
          component={Link}
          to="/strains">
          Strain Catalog
        </Button>
        <Button
          className={classes.button}
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
