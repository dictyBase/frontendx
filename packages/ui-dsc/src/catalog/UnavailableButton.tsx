import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

type UnavailableButtonProperties = {
  /** Title used for button tooltip and aria-label */
  title: string
  /** Size of icon */
  size?: "small" | "medium" | undefined
}
/**
 * UnavailableButton appears on catalog pages when an item
 * is not in stock.
 */

const UnavailableButton = ({
  title,
  size = "medium",
}: UnavailableButtonProperties) => {
  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          disabled
          size={size}
          aria-label={title}
          color="default"
          sx={{ color: "#8a8a8a" }}>
          <RemoveShoppingCartIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export { UnavailableButton }
