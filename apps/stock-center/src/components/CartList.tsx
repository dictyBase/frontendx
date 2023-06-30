import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { map, mapWithIndex } from "fp-ts/Array"
import { of, match as Omatch } from "fp-ts/Option"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import CardActions from "@material-ui/core/CardActions"
import {
  ContinueShoppingCard,
  CartItem,
  CheckoutButton,
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
} from "@dictybase/ui-dsc"
import { useAtom } from "jotai"
import { Cart, strainItemAtomsAtom } from "../cartState"
import { isFull } from "../isFull"

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: "0px",
  },
  divider: {
    marginBottom: theme.spacing(2),
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
            mapWithIndex((index, item) => of({ index, item })),
            map(
              Omatch(
                () => <></>,
                ({ index, item }) => (
                  <CartItem
                    item={item}
                    key={item.id}
                    deleteItem={() =>
                      dispatch({ type: "remove", atom: strainItemAtoms[index] })
                    }
                  />
                ),
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
          {renderCartTotal(cart)}
          <Divider className={classes.divider} />
          <CardActions>
            <CheckoutButton />
          </CardActions>
        </Card>
        {!isFull(cart.strainItems) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { CartList }
