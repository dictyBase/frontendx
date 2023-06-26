import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import {
  ShoppingCartItem,
  ShoppingCartTotalCard,
  ContinueShoppingCard,
} from "@dictybase/ui-dsc"
import { type Cart } from "../state"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartWithItemsProperties = {
  items: Cart["strainItems"]
  isFull: boolean
}
/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartWithItems = ({
  items,
  isFull,
}: ShoppingCartWithItemsProperties) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {items.map((item) => (
            <div key={item.id}>ShoppingCartItem will go here</div>
            // <ShoppingCartItem key={item.id} item={item} />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <ShoppingCartTotalCard items={items} />
        {!isFull && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export default ShoppingCartWithItems
