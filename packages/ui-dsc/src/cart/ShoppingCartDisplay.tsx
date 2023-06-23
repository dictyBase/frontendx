import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"
import { CartItemWithQuantity } from "../common/types"
import { ShoppingCartWithItems } from "./ShoppingCartWIthItems"
import { EmptyCart } from "./EmptyCart"

type ShoppingCartDisplayProperties = {
  itemsWithQuantity: CartItemWithQuantity[]
  maxItemsInCart: boolean
}

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
}))

export const ShoppingCartDisplay = ({
  itemsWithQuantity,
  maxItemsInCart,
}: ShoppingCartDisplayProperties) => {
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
      <EmptyCart />
      {/* {itemsWithQuantity.length > 0 ? (
        <ShoppingCartWithItems
          itemsWithQuantity={itemsWithQuantity}
          maxItemsInCart={maxItemsInCart}
        />
      ) : (
        <EmptyCart />
      )} */}
    </>
  )
}
