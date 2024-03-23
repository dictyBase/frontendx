import Dialog from "@material-ui/core/Dialog"
import { DialogTitleDisplay } from "./DialogTitleDisplay"
import { AddToCartDialogContent } from "./AddToCartDialogContent"
import { AddToCartDialogActions } from "./AddToCartDialogActions"
import { CatalogItem } from "../types"

type Properties = {
  /** Strain data */
  data: Array<CatalogItem>
  /** Function to add to checked items array */
  setCheckedItems?: (argument0: Array<CatalogItem>) => void
  /** Function to display dialog box after adding item to cart */
  setShowDialog: (argument0: boolean) => void
  /** Function to toggle hover state for given item */
  setHover?: (argument0: boolean) => void
}

/**
 * AddToCartDialog is the dialog box that appears when an item
 * is added to the cart.
 */

const AddToCartDialog = ({
  data,
  setCheckedItems,
  setShowDialog,
  setHover,
}: Properties) => {
  const handleClose = () => {
    setShowDialog(false)
    setCheckedItems?.([])
    // set hovering to false if button is in catalog list item
    setHover?.(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      aria-labelledby="cart-dialog-title"
      open>
      <DialogTitleDisplay title="Added to Cart" handleClose={handleClose} />
      <AddToCartDialogContent data={data} />
      <AddToCartDialogActions handleClose={handleClose} />
    </Dialog>
  )
}

export { AddToCartDialog }
