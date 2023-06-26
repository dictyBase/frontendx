import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type CartItemLimit = Readonly<number>

// This is the State
type Cart = {
  strainItems: Array<StrainItem>
  maxItems: CartItemLimit
}

export { type StrainItem, type CartItemLimit, type Cart }
