import React from "react"
import { match } from "ts-pattern"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { red } from "@material-ui/core/colors"
import { useSetAtom } from "jotai"
import { SecondaryButton, AddToCartDialog } from "@dictybase/ui-dsc"
import { useCartItemProperties } from "../hooks/useCartItemProperties"
import { addStrainItemsAtom, removeItemAtom } from "../cartState"
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

type Properties = {
  cartData: StrainCartItem
}

const AvailableDisplay = ({ cartData }: Properties) => {
  const cartItemProperties = useCartItemProperties(cartData)
  const addToCart = useSetAtom(addStrainItemsAtom)
  const removeFromCart = useSetAtom(removeItemAtom)
  const classes = useStyles()
  const [showDialog, setShowDialog] = React.useState(false)

  const handleAddToCart = () => {
    addToCart([cartData])
    setShowDialog(true)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(cartData)
  }

  return (
    <Grid item container alignItems="center" className={classes.container}>
      {match(cartItemProperties)
        .with({ isInCart: true }, () => (
          <Grid item>
            <SecondaryButton
              variant="contained"
              color="secondary"
              style={{ backgroundColor: red[900] }}
              onClick={handleRemoveFromCart}>
              Remove From Cart
            </SecondaryButton>
          </Grid>
        ))
        .with({ isFull: true }, () => (
          <Link to="/information/order" className={classes.maxItems}>
            Cart capacity is full
          </Link>
        ))
        .with({ isInCart: false }, () => (
          <Grid item>
            <SecondaryButton
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}>
              Add to Cart
            </SecondaryButton>
          </Grid>
        ))
        .otherwise(() => (
          <></>
        ))}
      {match(showDialog)
        .with(true, () => (
          <AddToCartDialog data={[cartData]} setShowDialog={setShowDialog} />
        ))
        .with(false, () => <></>)
        .exhaustive()}
    </Grid>
  )
}

export { AvailableDisplay }
