import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import {
  ShoppingCartItem,
  ShoppingCartTotalCard,
  ContinueShoppingCard,
} from "@dictybase/ui-dsc"
import { type StrainItems } from "../cartState"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartWithItemsProperties = {
  /**
   * An array of cart items
   */
  items: StrainItems
  /**
   * A flag indicating whether the cart is full
   */
  isFull: boolean
  /**
   * A callback that will be run when the user clicks a delete button on a ShoppingCartItem
   */
  deleteItem: (id: string) => void
}

/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartWithItems = ({
  items,
  isFull,
  deleteItem,
}: ShoppingCartWithItemsProperties) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {items.map((item) => (
            <ShoppingCartItem
              key={item.id}
              item={item}
              deleteItem={deleteItem}
            />
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

export { ShoppingCartWithItems }
