import { useAtomValue } from "jotai"
import { EmptyCart } from "@dictybase/ui-dsc"
import { ShoppingCartList } from "../components/ShoppingCartList"
import { strainItemsAtom } from "../cartState"

/**
 * Displays different UI components based on whether there are currently items in the cart
 *
 * @returns ShoppingCartWithItems or EmptyCart
 */
const CartHandler = () => {
  const items = useAtomValue(strainItemsAtom)

  return (
    <>{items.length > 0 ? <ShoppingCartList items={items} /> : <EmptyCart />}</>
  )
}

export default CartHandler
