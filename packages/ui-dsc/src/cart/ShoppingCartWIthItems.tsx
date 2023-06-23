import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ShoppingCartItem from "./ShoppingCartItem"
import ShoppingCartTotalCard from "./ShoppingCartTotalCard"
import ContinueShoppingCard from "./ContinueShoppingCard"
import { CartItemWithQuantity } from "../common/types"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartWithItemsProperties = {
  itemsWithQuantity: CartItemWithQuantity[]
  maxItemsInCart: boolean
}
/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
export const ShoppingCartWithItems = ({
  itemsWithQuantity,
  maxItemsInCart,
}: ShoppingCartWithItemsProperties) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {itemsWithQuantity.map((item: CartItemWithQuantity) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <ShoppingCartTotalCard />
        {!maxItemsInCart && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}
