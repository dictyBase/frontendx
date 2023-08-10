import { MouseEvent, ReactNode, useState } from "react"
import { SecondaryButton } from "@dictybase/ui-dsc"
import { useSetAtom, useAtomValue } from "jotai"
import { addItemAtom, currentCartQuantityAtom, maxItemsAtom } from "../state"

type AddToCartButtonProperties = {
  children?: ReactNode
}

const AddToCartControl = ({
  children = "Add to Cart",
}: AddToCartButtonProperties) => {
  const addItem = useSetAtom(addItemAtom)
  const maxItems = useAtomValue(maxItemsAtom)
  const currentCartQuantity = useAtomValue(currentCartQuantityAtom)
  const quantityToAdd = useState()
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    addItem
  }
  return <SecondaryButton onClick={onClick}>{children}</SecondaryButton>
}

export { AddToCartControl }
