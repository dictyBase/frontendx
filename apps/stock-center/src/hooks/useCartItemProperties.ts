import { useAtomValue } from "jotai"
import { findFirst } from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { Strain } from "dicty-graphql-schema"
import { isFullAtom, strainItemsAtom } from "../state"

const useCartItemProperties = (
  item: Pick<Strain, "id" | "label" | "summary" | "in_stock">,
) => {
  const isFull = useAtomValue(isFullAtom)
  const itemsInCart = useAtomValue(strainItemsAtom)
  const isInCart = pipe(
    itemsInCart,
    findFirst((cartItem) => item.id === cartItem.id),
    Omatch(
      () => false,
      () => true,
    ),
  )
  const { in_stock } = item

  return { isFull, in_stock, isInCart }
}

export { useCartItemProperties }
