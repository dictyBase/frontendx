import { useAtomValue } from "jotai"
import { EmptyCart } from "@dictybase/ui-dsc"
import ShoppingCartWithItems from "../components/ShoppingCartWithItems"
import { totalItemsAtom, cartFullAtom } from "../state"
/** ShoppingCartPage displays different UIs based on whether
 *  there are currently items in the cart. * */
const CartHandler = () => {
  const items = useAtomValue(totalItemsAtom)
  const isFull = useAtomValue(cartFullAtom)
  return (
    <>
      {items.length > 0 ? (
        <ShoppingCartWithItems items={items} isFull={isFull} />
      ) : (
        <EmptyCart />
      )}
    </>
  )
}

export default CartHandler
