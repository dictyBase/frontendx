import { match } from "ts-pattern"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import {
  ContinueShoppingCard,
  ShoppingCartItem,
  ShoppingCartTotalRowV2,
} from "@dictybase/ui-dsc"
import { useAtom } from "jotai"
import { Cart, strainItemAtomsAtom } from "../cartState"
import { isFull } from "../isFull"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartListProperties = {
  /** An array of cart items */
  cart: Cart
}
/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartList = ({ cart }: ShoppingCartListProperties) => {
  const [strainItemAtoms, dispatch] = useAtom(strainItemAtomsAtom)
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {cart.strainItems.map((item, index) => (
            <ShoppingCartItem
              item={item}
              key={item.id}
              deleteItem={() =>
                dispatch({ type: "remove", atom: strainItemAtoms[index] })
              }
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card>
          {match(cart)
            .when(
              ({ strainItems }) => strainItems.length > 0,
              ({ strainItems }) => (
                <ShoppingCartTotalRowV2
                  leftValue="Strains"
                  items={strainItems}
                  variant="body2"
                />
              ),
            )
            .otherwise(() => (
              <></>
            ))}
        </Card>
        {!isFull(cart.strainItems) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { ShoppingCartList }
