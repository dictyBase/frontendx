import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { useSetAtom } from "jotai"
import { AddToCartDialog, fees } from "@dictybase/ui-dsc"
import { Strain } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/Array"
import { type StrainItem, addItemsAtom } from "../state"

const useStyles = makeStyles(({ palette }) => ({
  cartButton: {
    color: palette.secondary.main,
  },
}))

type Properties = {
  /** Stock data */
  data: Array<Pick<Strain, "id" | "label" | "summary" | "inStock">>
  /** Function to toggle the AddToCartDialog */
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  /** Function to add to checked items array */
  setCheckedItems?: (argument0: Array<StrainItem>) => void
  /** Size of icon */
  size?: "small" | "medium" | undefined
  /** Function to toggle hover state for given item */
  setHover?: (argument0: boolean) => void
}

const appendFee = (
  a: Pick<Strain, "id" | "label" | "summary" | "inStock">,
) => ({ ...a, fee: fees.STRAIN_FEE })
/**
 * AddToCartButton appears on the catalog page if the stock is available
 * for purchase.
 */

const AddToCartButton = ({
  data,
  size = "medium",
  setShowDialog,
}: Properties) => {
  const classes = useStyles()
  const addItems = useSetAtom(addItemsAtom)

  const handleClick = () => {
    pipe(data, map(appendFee), addItems)
    setShowDialog(true)
  }

  return (
    <>
      <strong>
        <IconButton
          size={size}
          className={classes.cartButton}
          onClick={handleClick}
          title="Add to shopping cart"
          aria-label="Add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </strong>
    </>
  )
}

export { AddToCartButton }
