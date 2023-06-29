import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type StrainItems = Array<StrainItem>
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: StrainItems
}

export { type StrainItem, type StrainItems, type CartItemLimit, type Cart }
