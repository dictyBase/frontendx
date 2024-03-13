import type { Strain, Plasmid } from "dicty-graphql-schema"

type PurchaseProperties = { fee: Readonly<number> }

type StrainItem = Pick<
  Strain,
  "__typename" | "id" | "summary" | "label" | "in_stock"
>
type PlasmidItem = Pick<
  Plasmid,
  "__typename" | "id" | "summary" | "name" | "in_stock"
>
type CatalogItem = StrainItem | PlasmidItem
type StrainCartItem = StrainItem & PurchaseProperties
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: Array<StrainCartItem>
}

export {
  type StrainItem,
  type PlasmidItem,
  type CatalogItem,
  type StrainCartItem,
  type StrainCartItem as CartItem,
  type CartItemLimit,
  type Cart,
}
