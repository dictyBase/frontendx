import { MouseEventHandler } from "react"
import IconButton from "@mui/material/IconButton"
import { useSetAtom } from "jotai"
import DeleteIcon from "@material-ui/icons/Delete"
import { removeItemAtom } from "../cartState"
import type { CatalogItem } from "../types"

type RemoveFromCartButtonProperties = {
  item: CatalogItem
}

/**
 * RemoveFromCartButton is the icon used for removing an item from the cart.
 */
const RemoveFromCartButton = ({ item }: RemoveFromCartButtonProperties) => {
  const removeItem = useSetAtom(removeItemAtom)

  const handleClick: MouseEventHandler = (event) => {
    event.stopPropagation()
    removeItem(item)
  }

  return (
    <IconButton
      sx={(theme) => ({ color: theme.palette.error.main })}
      color="secondary"
      title="Remove from cart"
      aria-label="Remove from cart"
      onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export { RemoveFromCartButton }
