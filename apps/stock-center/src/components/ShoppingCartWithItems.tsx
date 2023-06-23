import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ShoppingCartItem from "@dictybase/ui-dsc/src/cart/ShoppingCartItem"
import ShoppingCartTotalCard from "@dictybase/ui-dsc/src/cart/ShoppingCartTotalCard"
import ContinueShoppingCard from "@dictybase/ui-dsc/src/cart/ContinueShoppingCard"
import { StrainItem, PlasmidItem } from "../state"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartWithItemsProperties = {
  items: (StrainItem | PlasmidItem)[]
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
            <ShoppingCartItem key={item.id} item={item} />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <ShoppingCartTotalCard />
        {!isFull && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export default ShoppingCartWithItems
