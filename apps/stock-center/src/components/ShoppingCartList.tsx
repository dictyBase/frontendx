import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import { ShoppingCartTotalCard, ContinueShoppingCard } from "@dictybase/ui-dsc"
import { useAtom } from "jotai"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { type StrainItems, strainItemAtomsAtom } from "../cartState"
import { isFull } from "../isFull"

const useStyles = makeStyles(() => ({
  list: {
    paddingTop: "0px",
  },
}))

type ShoppingCartListProperties = {
  /** An array of cart items */
  items: StrainItems
}
/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartList = ({ items }: ShoppingCartListProperties) => {
  const [strainItemAtoms, dispatch] = useAtom(strainItemAtomsAtom)
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {strainItemAtoms.map((atom) => (
            <ShoppingCartItem
              itemAtom={atom}
              deleteItem={() => dispatch({ type: "remove", atom })}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <ShoppingCartTotalCard items={items} />
        {!isFull(items) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { ShoppingCartList }
