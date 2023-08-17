import { useState } from "react"
import { useAtomValue } from "jotai"
import { findFirst } from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { Strain } from "dicty-graphql-schema"
import { UnavailableButton, AddToCartDialog } from "@dictybase/ui-dsc"
import { AddToCartButton } from "./AddToCartButton"
import { isFullAtom, strainItemsAtom } from "../state"
import { RemoveFromCartButton } from "./RemoveFromCartButton"

type AddToCartButtonHandlerProperties = {
  item: Pick<Strain, "id" | "label" | "summary" | "inStock">
}

const useStockProperties = (
  item: Pick<Strain, "id" | "label" | "summary" | "inStock">,
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
  const { inStock } = item

  return { isFull, inStock, isInCart }
}

const AddToCartButtonHandler = ({ item }: AddToCartButtonHandlerProperties) => {
  const [showDialog, setShowDialog] = useState(false)
  const { inStock, isFull, isInCart } = useStockProperties(item)
  return (
    <>
      {match({ inStock, isFull, isInCart })
        .with({ inStock: false }, () => (
          <UnavailableButton
            title="Item is currently unavailable"
            size="medium"
          />
        ))
        .with({ isInCart: true }, () => <RemoveFromCartButton item={item} />)
        .with({ isFull: true }, () => (
          <UnavailableButton title="Shopping cart is full" size="medium" />
        ))
        .with({ isFull: false, inStock: true }, () => (
          <AddToCartButton data={[item]} setShowDialog={setShowDialog} />
        ))
        .otherwise(() => (
          <></>
        ))}
      {match(showDialog)
        .with(true, () => (
          <AddToCartDialog data={[item]} setShowDialog={setShowDialog} />
        ))
        .with(false, () => <></>)
        .exhaustive()}
    </>
  )
}

export { AddToCartButtonHandler }
