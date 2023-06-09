import { useAtomValue } from "jotai"
import { EmptyCart } from "@dictybase/ui-dsc"
import { CartList } from "../components/CartList"
import { cartAtom } from "../state"

/**
 * Displays different UI components based on whether there are currently items in the cart
 *
 * @returns ShoppingCartWithItems or EmptyCart
 */
const CartHandler = () => {
  const cart = useAtomValue(cartAtom)

  return (
    <>
      {cart.strainItems.length > 0 ? <CartList cart={cart} /> : <EmptyCart />}
    </>
  )
}

export default CartHandler
