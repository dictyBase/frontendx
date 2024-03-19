import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import CardActions from "@material-ui/core/CardActions"
import { grey } from "@material-ui/core/colors"
import {
  ContinueShoppingCard,
  CartItem,
  CheckoutButton,
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
} from "@dictybase/ui-dsc"
import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai"
import { Cart, strainItemAtomsAtom, plasmidItemAtomsAtom } from "../state"
import type { PlasmidCartItem, StrainCartItem } from "../types"
import { isFull } from "../isFull"

type ShoppingCartListProperties = {
  /** An array of cart items */
  cart: Cart
}
type SplitAtomAction<Item> =
  | { type: "remove"; atom: PrimitiveAtom<Item> }
  | {
      type: "insert"
      value: Item
      before?: PrimitiveAtom<Item>
    }
  | {
      type: "move"
      atom: PrimitiveAtom<Item>
      before?: PrimitiveAtom<Item>
    }

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: "0px",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: grey[100],
  },
}))

type StrainCartItemFromAtomProperties = {
  strainCartItemAtom: PrimitiveAtom<StrainCartItem>
  dispatch: (update: SplitAtomAction<StrainCartItem>) => void
}

const StrainCartItemFromAtom = ({
  strainCartItemAtom,
  dispatch,
}: StrainCartItemFromAtomProperties) => {
  const strainCartItem = useAtomValue(strainCartItemAtom)
  return (
    <CartItem
      item={strainCartItem}
      deleteItem={() => dispatch({ type: "remove", atom: strainCartItemAtom })}
    />
  )
}

type PlasmidCartItemFromAtomProperties = {
  plasmidCartItemAtom: PrimitiveAtom<PlasmidCartItem>
  dispatch: (update: SplitAtomAction<PlasmidCartItem>) => void
}

const PlasmidCartItemFromAtom = ({
  plasmidCartItemAtom,
  dispatch,
}: PlasmidCartItemFromAtomProperties) => {
  const strainCartItem = useAtomValue(plasmidCartItemAtom)
  return (
    <CartItem
      item={strainCartItem}
      deleteItem={() => dispatch({ type: "remove", atom: plasmidCartItemAtom })}
    />
  )
}

const renderTotalRows = (cart: Cart) => (
  <>
    {match(cart)
      .when(
        ({ strainItems, plasmidItems }) =>
          strainItems.length > 0 && plasmidItems.length > 0,
        renderStrainAndPlasmidTotals,
      )
      .when(({ strainItems }) => strainItems.length > 0, renderStrainTotal)
      .when(({ plasmidItems }) => plasmidItems.length > 0, renderPlasmidTotal)
      .otherwise(() => (
        <>No items found. This page should not appear.</>
      ))}
    {renderCartTotal(cart)}
  </>
)

const CartList = ({ cart }: ShoppingCartListProperties) => {
  const [strainItemAtoms, dispatchS] = useAtom(strainItemAtomsAtom)
  const [plasmidItemAtoms, dispatchP] = useAtom(plasmidItemAtomsAtom)
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {pipe(
            strainItemAtoms,
            Amap((strainItemAtom) => (
              <StrainCartItemFromAtom
                strainCartItemAtom={strainItemAtom}
                dispatch={dispatchS}
              />
            )),
          )}
        </List>
        <List className={classes.list}>
          {pipe(
            plasmidItemAtoms,
            Amap((plasmidItemAtom) => (
              <PlasmidCartItemFromAtom
                plasmidCartItemAtom={plasmidItemAtom}
                dispatch={dispatchP}
              />
            )),
          )}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.card}>
          {renderTotalRows(cart)}
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
