import { atom } from "jotai"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type CartItemLimit = Readonly<number>

// This is the State
type Cart = {
  strainItems: Array<StrainItem>
  maxItems: CartItemLimit
}

const initialState: Cart = {
  strainItems: [],
  maxItems: 12,
}

const cartAtom = atom<Cart>(initialState)
