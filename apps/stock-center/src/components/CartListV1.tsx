import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { mapWithIndex } from "fp-ts/Array"
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
  // renderPlasmidTotal,
  // renderStrainAndPlasmidTotals,
  renderCartTotal,
} from "@dictybase/ui-dsc"
import { useAtom, PrimitiveAtom } from "jotai"
import { Cart, strainItemAtomsAtom, StrainItem } from "../state"
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
type DispatchProperties = (update: SplitAtomAction<StrainItem>) => void
type renderCartItemsPipelineProperties = {
  items: Array<StrainItem>
  fn: (index: number, item: StrainItem) => JSX.Element
}
type renderCartItemsProperties = {
  dispatch: DispatchProperties
  strainItemAtoms: Array<PrimitiveAtom<StrainItem>>
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: "0px",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}))

/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */

const renderCartItems =
  ({ dispatch, strainItemAtoms }: renderCartItemsProperties) =>
  // eslint-disable-next-line react/function-component-definition
  (index: number, item: StrainItem) => {
    const { id } = item
    return (
      <CartItem
        item={item}
        key={id}
        deleteItem={() =>
          dispatch({ type: "remove", atom: strainItemAtoms[index] })
        }
      />
    )
  }
const renderCartItemsPipeline = ({
  items,
  fn,
}: renderCartItemsPipelineProperties) => pipe(items, mapWithIndex(fn))

const renderTotalRows = (cart: Cart) => (
  <>
    {match(cart)
      // .when(
      //   ({ strainItems, plasmidItems }) =>
      //     strainItems.length > 0 && plasmidItems.length > 0,
      //   renderStrainAndPlasmidTotals,
      // )
      .when(({ strainItems }) => strainItems.length > 0, renderStrainTotal)
      // .when(
      //   ({ plasmidItems }) => plasmidItems.length > 0,
      //   renderPlasmidTotal,
      // )
      .otherwise(() => (
        <>No items found. This page should not appear.</>
      ))}
    {renderCartTotal(cart)}
  </>
)

const CartList = ({ cart }: ShoppingCartListProperties) => {
  const [strainItemAtoms, dispatch] = useAtom(strainItemAtomsAtom)
  const classes = useStyles()
  const renderCartItemsFunction = renderCartItems({ dispatch, strainItemAtoms })

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {renderCartItemsPipeline({
            items: cart.strainItems,
            fn: renderCartItemsFunction,
          })}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card>
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
