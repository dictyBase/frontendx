import { useAtomValue } from "jotai"
import { match } from "ts-pattern"
import { isFullAtom } from "../state"
import { AddToCartButton } from "./AddToCartButton"
import { Strain } from "dicty-graphql-schema"
import { UnavailableButton } from "@dictybase/ui-dsc"

type AddToCartButtonHandlerProperties = {
  item: Pick<Strain, "id" | "label" | "summary" | "inStock">
}

const AddToCartButtonHandler = ({ item }: AddToCartButtonHandlerProperties) => {
  const isFull = useAtomValue(isFullAtom)
  const inStock = item.inStock
  return match({ inStock, isFull })
    .with({ inStock: false }, () => (
      <UnavailableButton title="Item is currently unavailable" size="medium" />
    ))
    .with({ isFull: true }, () => (
      <UnavailableButton title="Shopping cart is full" size="medium" />
    ))
    .with({ isFull: false, inStock: true }, () => (
      <AddToCartButton data={[item]} />
    ))
    .otherwise(() => <></>)
}

export { AddToCartButtonHandler }
