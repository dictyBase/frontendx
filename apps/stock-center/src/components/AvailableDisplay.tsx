import React from "react"
import { match } from "ts-pattern"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { red } from "@material-ui/core/colors"
import { useAtomValue, useSetAtom } from "jotai"
import {
  SecondaryButton,
  AddToCartDialog,
  // OutlinedDropdown,
} from "@dictybase/ui-dsc"
import { useCartItemProperties } from "../hooks/useCartItemProperties"
import { strainItemsAtom, addStrainItemsAtom, removeItemAtom } from "../state"
import type { StrainCartItem } from "../types"

const useStyles = makeStyles(({ palette }) => ({
  container: {
    paddingRight: "5px",
  },
  quantity: {
    marginRight: "10px",
  },
  maxItems: {
    color: palette.error.main,
    "&:hover": {
      color: palette.error.dark,
    },
  },
}))

const createQuantityArray = (numberItems: number) => {
  const qty = 13 - numberItems // quantity of items available to add to cart
  return new Array(qty)
    .fill(0) // fill array with meaningless values
    .map((_, index) => index + 1) // map into new array of numbers
    .slice(0, -1) // remove extra item from end
}

type Properties = {
  cartData: StrainCartItem
}

const AvailableDisplay = ({ cartData }: Properties) => {
  const cartItemProperties = useCartItemProperties(cartData)
  const addedItems = useAtomValue(strainItemsAtom)
  const addToCart = useSetAtom(addStrainItemsAtom)
  const removeFromCart = useSetAtom(removeItemAtom)
  const values = createQuantityArray(addedItems.length)
  const classes = useStyles()
  const [quantity, setQuantity] = React.useState(values[0] as number)
  const [showDialog, setShowDialog] = React.useState(false)

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuantity(Number(event.target.value))
  // }

  const handleAddToCart = () => {
    addToCart([cartData])
    setShowDialog(true)
    setQuantity(values[0] as number)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(cartData.id)
  }

  return (
    <Grid item container alignItems="center" className={classes.container}>
      {match(cartItemProperties)
        .with({ isInCart: true }, () => (
          <>
            <Grid item>
              <SecondaryButton
                variant="contained"
                color="secondary"
                style={{ backgroundColor: red[900] }}
                onClick={handleRemoveFromCart}>
                Remove From Cart
              </SecondaryButton>
            </Grid>
          </>
        ))
        .with({ isFull: true }, () => (
          <Link to="/information/order" className={classes.maxItems}>
            Cart capacity is full
          </Link>
        ))
        .with({ isInCart: false }, () => (
          <>
            <Grid item>
              <SecondaryButton
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}>
                Add to Cart
              </SecondaryButton>
            </Grid>
          </>
        ))
        .otherwise(() => (
          <></>
        ))}
      {match(showDialog)
        .with(true, () => (
          <AddToCartDialog
            data={new Array(quantity).fill(cartData)}
            setShowDialog={setShowDialog}
          />
        ))
        .with(false, () => <></>)
        .exhaustive()}
    </Grid>
  )
}

export { AvailableDisplay }
