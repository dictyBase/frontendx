import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import Divider from "@material-ui/core/Divider"
import { ShoppingCartTotalCard, ContinueShoppingCard } from "@dictybase/ui-dsc"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { type StrainItems } from "../types"
import { isFull } from "../utils/isFull"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartListProperties = {
  /** An array of cart items */
  items: StrainItems
  /** A callback that will be run when the user clicks a delete button on a ShoppingCartItem */
  deleteItem: () => void
}

/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartList = ({
  items,
  deleteItem,
}: ShoppingCartListProperties) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {items.map((item) => (
            <ShoppingCartItem item={item} deleteItem={deleteItem} />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card></Card>
        {!isFull(items) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { ShoppingCartList }
