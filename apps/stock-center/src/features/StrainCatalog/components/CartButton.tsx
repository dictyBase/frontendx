import { useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { IconButton, Badge } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { currentCartQuantityAtom, isFullAtom } from "../../../cartState"

/**
 * CartButton displays a shopping cart icon with a badge showing the current
 * number of items in the cart. Clicking navigates to the cart page.
 * This is a state-dependent component that uses Jotai atoms.
 */
const CartButton = () => {
  const navigate = useNavigate()
  const cartQuantity = useAtomValue(currentCartQuantityAtom)
  const isFull = useAtomValue(isFullAtom)

  const handleClick = () => navigate("/cart")

  return (
    <IconButton
      onClick={handleClick}
      aria-label={`shopping cart with ${cartQuantity} items`}
      color="primary"
      sx={{
        position: "relative",
      }}>
      <Badge
        badgeContent={cartQuantity}
        color={isFull ? "error" : "secondary"}
        showZero
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: isFull ? "#e53e3e" : "#3182ce",
            color: "white",
            fontWeight: 600,
          },
        }}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export { CartButton }
