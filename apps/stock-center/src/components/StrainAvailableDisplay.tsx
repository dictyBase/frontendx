import React from "react"
import { match } from "ts-pattern"
import { Box, Button, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { red } from "@mui/material/colors"
import { useSetAtom } from "jotai"
import { AddToCartDialog } from "@dictybase/ui-dsc"
import { useCartItemProperties } from "../hooks/useCartItemProperties"
import { addStrainItemsAtom, removeItemAtom } from "../cartState"
import type { StrainCartItem } from "../types"

type Properties = {
  cartData: StrainCartItem
}

const StrainAvailableDisplay = ({ cartData }: Properties) => {
  const cartItemProperties = useCartItemProperties(cartData)
  const addToCart = useSetAtom(addStrainItemsAtom)
  const removeFromCart = useSetAtom(removeItemAtom)
  const [showDialog, setShowDialog] = React.useState(false)

  const handleAddToCart = () => {
    addToCart([cartData])
    setShowDialog(true)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(cartData)
  }

  return (
    <Grid item container alignItems="center" sx={{ pr: "5px" }}>
      {match(cartItemProperties)
        .with({ isInCart: true }, () => (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              sx={(t) => ({
                color: t.palette.primary.main,
                backgroundColor: red[900],
                "&:hover": {
                  color: t.palette.primary.contrastText,
                  backgroundColor: t.palette.action.hover,
                },
              })}
              onClick={handleRemoveFromCart}>
              Remove From Cart
            </Button>
          </Grid>
        ))
        .with({ isFull: true }, () => (
          <Box
            component={Link}
            to="/information/order"
            sx={{
              color: "error.main",
              "&:hover": {
                color: "error.dark",
              },
            }}>
            Cart capacity is full
          </Box>
        ))
        .with({ isInCart: false }, () => (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}>
              Add to Cart
            </Button>
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

export { StrainAvailableDisplay }
