import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
}))

/**
 * ShoppingCartHeader displays text indicating the Cart page. It also uses the Helmet component to change the
 * the document head.
 */
const ShoppingCartHeader = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Dicty Stock Center</title>
        <meta
          name="description"
          content="Shopping cart page for Dicty Stock Center"
        />
      </Helmet>
      <Box marginTop={3} marginBottom={3}>
        <Typography variant="h1">Your Shopping Cart</Typography>
        <Divider className={classes.divider} />
      </Box>
    </>
  )
}

export { ShoppingCartHeader }
