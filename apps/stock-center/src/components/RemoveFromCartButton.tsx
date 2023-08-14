import IconButton from "@material-ui/core/IconButton"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useSetAtom } from "jotai"
import DeleteIcon from "@material-ui/icons/Delete"
import { StrainItem, removeItemAtom } from "../state"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}))

type RemoveFromCartButtonProperties = {
  item: StrainItem
}

/**
 * RemoveFromCartButton is the icon used for removing an item from the cart.
 */

const RemoveFromCartButton = ({ item }: RemoveFromCartButtonProperties) => {
  const removeItem = useSetAtom(removeItemAtom)
  const classes = useStyles()

  const handleClick = () => {
    removeItem(item.id)
  }

  return (
    <IconButton
      className={classes.button}
      color="secondary"
      title="Remove from cart"
      aria-label="Remove from cart"
      onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export { RemoveFromCartButton }
