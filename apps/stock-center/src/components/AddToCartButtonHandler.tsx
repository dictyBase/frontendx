import { useState } from "react"
import { match } from "ts-pattern"
import { Strain } from "dicty-graphql-schema"
import { UnavailableButton, AddToCartDialog } from "@dictybase/ui-dsc"
import { AddToCartButton } from "./AddToCartButton"
import { RemoveFromCartButton } from "./RemoveFromCartButton"
import { useCartItemProperties } from "../hooks/useCartItemProperties"
import type { StrainItem, PlasmidItem } from "../types"

type AddToCartButtonHandlerProperties = {
  item: StrainItem | PlasmidItem
}

const AddToCartButtonHandler = ({ item }: AddToCartButtonHandlerProperties) => {
  const [showDialog, setShowDialog] = useState(false)
  const { in_stock, isFull, isInCart } = useCartItemProperties(item)
  return (
    <>
      {match({ in_stock, isFull, isInCart })
        .with({ in_stock: false }, () => (
          <UnavailableButton
            title="Item is currently unavailable"
            size="medium"
          />
        ))
        .with({ isInCart: true }, () => <RemoveFromCartButton item={item} />)
        .with({ isFull: true }, () => (
          <UnavailableButton title="Shopping cart is full" size="medium" />
        ))
        .with({ isFull: false, in_stock: true }, () => (
          <AddToCartButton items={[item]} setShowDialog={setShowDialog} />
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
