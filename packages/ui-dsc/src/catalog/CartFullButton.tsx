import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits"

type CartFullButtonProperties = {
  /** Size of icon */
  size?: "small" | "medium" | undefined
}

/**
 * CartFullButton appears on catalog pages when the shopping cart has
 * reached its maximum capacity. It renders a dedicated quantity-limit icon
 * so the full-cart state is distinguishable from the out-of-stock button.
 */
const CartFullButton = ({ size = "medium" }: CartFullButtonProperties) => (
  <Tooltip title="Shopping cart is full">
    <span>
      <IconButton
        disabled
        size={size}
        aria-label="Shopping cart is full"
        color="default"
        sx={{ color: "#8a8a8a" }}>
        <ProductionQuantityLimitsIcon />
      </IconButton>
    </span>
  </Tooltip>
)

export { CartFullButton }
export type { CartFullButtonProperties }
