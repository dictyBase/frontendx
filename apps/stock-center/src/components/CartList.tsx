import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/Array"
import { of, match as Omatch } from "fp-ts/Option"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import {
  ContinueShoppingCard,
  CartItem,
  CartTotalRowV2,
} from "@dictybase/ui-dsc"
import { useAtom } from "jotai"
import { Cart, strainItemAtomsAtom } from "../cartState"
import {
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderStrainTotal,
} from "../functional"
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
const CartList = ({ cart }: ShoppingCartListProperties) => {
  const [strainItemAtoms, dispatch] = useAtom(strainItemAtomsAtom)
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {pipe(
            cart.strainItems,
            map((a) => of(a)),
            Omatch(
              () => <></>,
              (item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  deleteItem={() =>
                    dispatch({ type: "remove", atom: strainItemAtoms[index] })
                  }
                />
              ),
            ),
          )}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card>
          {match(cart)
            // .when(
            //   ({ strainItems, plasmidItems }) =>
            //     strainItems.length > 0 && plasmidItems.length > 0,
            //   renderStrainAndPlasmidTotals,
            // )
            .when(
              ({ strainItems }) => strainItems.length > 0,
              renderStrainTotal,
            )
            // .when(
            //   ({ plasmidItems }) => plasmidItems.length > 0,
            //   renderPlasmidTotal,
            // )
            .otherwise(() => (
              <></>
            ))}
        </Card>
        {!isFull(cart.strainItems) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { CartList }
