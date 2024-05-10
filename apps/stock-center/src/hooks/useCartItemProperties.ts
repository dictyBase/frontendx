import { useAtomValue } from "jotai"
import { elem } from "fp-ts/Array"
import { type Eq, contramap } from "fp-ts/Eq"
import { Eq as sEq } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import { isFullAtom, cartAtom } from "../state"
import type { CatalogItem } from "../types"

const itemEq: Eq<CatalogItem> = pipe(
  sEq,
  contramap((item) => item.id),
)

const useCartItemProperties = (catalogItem: CatalogItem) => {
  const isFull = useAtomValue(isFullAtom)
  const cart = useAtomValue(cartAtom)
  const isInCart = match(catalogItem)
    .with({ __typename: "Strain" }, (item) =>
      pipe(cart.strainItems, elem(itemEq)(item)),
    )
    .with({ __typename: "Plasmid" }, (item) =>
      pipe(cart.plasmidItems, elem(itemEq)(item)),
    )
    .otherwise(() => false)

  const { in_stock } = catalogItem
  return { isFull, in_stock, isInCart }
}

export { useCartItemProperties }
