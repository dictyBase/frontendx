import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"

const useStyles = makeStyles(() => ({
  cartFullSlash: {
    color: "#8a8a8a",
  },
}))

type Properties = {
  /** Title used for button tooltip and aria-label */
  title: string
  /** Size of icon */
  size?: "small" | "medium" | undefined
}
/**
 * UnavailableButton appears on catalog pages when an item
 * is not in stock.
 */

const UnavailableButton = ({ title, size = "medium" }: Properties) => {
  const classes = useStyles()

  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          disabled
          size={size}
          aria-label={title}
          color="default"
          className={classes.cartFullSlash}>
          <RemoveShoppingCartIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export { UnavailableButton }
