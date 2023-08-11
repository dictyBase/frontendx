import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSetAtom } from "jotai"
import { AddToCartDialog, UnavailableButton } from "@dictybase/ui-dsc"
import { type StrainItem, type StrainCartItem, addItemAtom } from "../state"

const useStyles = makeStyles(({ palette }) => ({
  cartButton: {
    color: palette.secondary.main,
  },
}))

type Props = {
  /** Stock data */
  data: Array<StrainCartItem>
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
  const addItem = useSetAtom(addItemAtom)

  const handleClick = () => {
    data.forEach((item) => addItem(item))
    setShowDialog(true)
  }

  return (
    <>
      <strong>
        <IconButton
          size={size}
          className={classes.cartButton}
          onClick={handleClick}
          title="Add"
          aria-label="Add to shopping cart">
          <FontAwesomeIcon icon="cart-plus" />
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
