import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Badge from "@material-ui/core/Badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { type CatalogCartItem } from "../types"

const useStyles = makeStyles(({ palette }) => ({
  cartFull: {
    fontSize: "0.7rem",
    color: palette.secondary.dark,
  },
  colorPrimary: {
    background: palette.secondary.light,
  },
}))

type CartIconProperties = {
  /**
   * An array of cart items
   */
  items: Array<CatalogCartItem>
  /**
   * A flag indicating whether the cart is full
   */
  isFull: boolean
}

/**
 * This is the cart component that displays between the Navbar and body content on every page.
 * It has a cart icon with the current number of added items next to it.
 */
const CartIcon = ({ items, isFull }: CartIconProperties) => {
  const classes = useStyles()

  return (
    <>
      <Link to="/cart" aria-label="shopping cart">
        <Badge
          classes={{ colorPrimary: classes.colorPrimary }}
          badgeContent={items.length}
          overlap="rectangular"
          showZero
          color="primary">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        </Badge>
      </Link>
      {isFull && <span className={classes.cartFull}>* cart full</span>}
    </>
  )
}

export { CartIcon }
