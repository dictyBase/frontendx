import { ShoppingCartDisplay } from "@dictybase/ui-dsc"
import { useAtomValue } from "jotai"
import { addedItemsAtom } from "../state"
/** ShoppingCartPage displays different UIs based on whether
 *  there are currently items in the cart. * */
const ShoppingCartPage = () => {
  const addedItems = useAtomValue(addedItemsAtom)
  return (
    <ShoppingCartDisplay
      itemsWithQuantity={addedItems}
      maxItemsInCart={false}
    />
  )
}

export default ShoppingCartPage
