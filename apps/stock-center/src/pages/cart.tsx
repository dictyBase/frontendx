import { useAtomValue } from "jotai"
import { CartHeader, EmptyCart } from "@dictybase/ui-dsc"
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
      <CartHeader />
      {cart.strainItems.length > 0 ? <CartList cart={cart} /> : <EmptyCart />}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default CartHandler
