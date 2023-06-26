import { useAtomValue, useSetAtom } from "jotai"
import { EmptyCart } from "../components/EmptyCart"
import { ShoppingCartWithItems } from "../components/ShoppingCartWithItems"
import { strainItemsAtom, deleteItemAtom, isFullAtom } from "../cartState"
/** ShoppingCartPage displays different UIs based on whether
 *  there are currently items in the cart. * */
const CartHandler = () => {
  const items = useAtomValue(strainItemsAtom)
  const isFull = useAtomValue(isFullAtom)
  const deleteItem = useSetAtom(deleteItemAtom)

  return (
    <>
      {items.length > 0 ? (
        <ShoppingCartWithItems
          items={items}
          isFull={isFull}
          deleteItem={deleteItem}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  )
}

export default CartHandler
