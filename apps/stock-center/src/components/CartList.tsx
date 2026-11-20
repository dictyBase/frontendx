import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import CardActions from "@mui/material/CardActions"
import { grey } from "@mui/material/colors"
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
import {
  Cart,
  cartAtom,
  strainItemAtomsAtom,
  plasmidItemAtomsAtom,
  isFullAtom,
} from "../cartState"
import type { PlasmidCartItem, StrainCartItem } from "../types"

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

const listStyle = {
  paddingTop: "0px",
}

const CartList = () => {
  const [strainItemAtoms, dispatchS] = useAtom(strainItemAtomsAtom)
  const [plasmidItemAtoms, dispatchP] = useAtom(plasmidItemAtomsAtom)
  const cart = useAtomValue(cartAtom)
  const isFull = useAtomValue(isFullAtom)

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List sx={listStyle}>
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
        <List sx={listStyle}>
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
        <Card
          sx={{
            padding: 2,
            marginTop: 2,
            backgroundColor: grey[100],
          }}>
          {renderTotalRows(cart)}
          <Divider sx={{ marginBottom: 2 }} />
          <CardActions>
            <CheckoutButton />
          </CardActions>
        </Card>
        {match(isFull)
          .with(false, () => <ContinueShoppingCard />)
          .with(true, () => <></>)
          .exhaustive()}
      </Grid>
    </Grid>
  )
}

export { CartList }
