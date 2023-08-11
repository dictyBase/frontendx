import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { useSetAtom } from "jotai"
import { AddToCartDialog, fees } from "@dictybase/ui-dsc"
import { Strain } from "dicty-graphql-schema"
import { type StrainItem, addItemsAtom } from "../state"

const useStyles = makeStyles(({ palette }) => ({
  cartButton: {
    color: palette.secondary.main,
  },
}))

type Props = {
  /** Stock data */
  data: Array<Pick<Strain, "id" | "label" | "summary" | "inStock">>
  /** Stock inventory status */
  // inStock: boolean
  /** Function to add to checked items array */
  setCheckedItems?: (arg0: Array<StrainItem>) => void
  /** Size of icon */
  size?: "small" | "medium" | undefined
  /** Function to toggle hover state for given item */
  setHover?: (arg0: boolean) => void
}

/**
 * AddToCartButton appears on the catalog page if the stock is available
 * for purchase.
 */

export const AddToCartButton = ({
  data,
  setHover,
  setCheckedItems,
  size = "medium",
}: Props) => {
  const classes = useStyles()
  const [showDialog, setShowDialog] = React.useState(false)
  const addItem = useSetAtom(addItemsAtom)

  const handleClick = () => {
    data.forEach((item) => addItem({ ...item, fee: fees.STRAIN_FEE }))
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
      {showDialog && (
        <AddToCartDialog
          data={data}
          setCheckedItems={setCheckedItems}
          setShowDialog={setShowDialog}
          setHover={setHover}
        />
      )}
    </>
  )
}

export default AddToCartButton
