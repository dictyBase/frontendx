import { useAtomValue } from "jotai"
import { findFirst } from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { isFullAtom, strainItemsAtom } from "../state"
import type { StrainItem, PlasmidItem } from "../types"

const useCartItemProperties = (item: StrainItem | PlasmidItem) => {
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
