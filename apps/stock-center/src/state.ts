import { atom } from "jotai"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type CartItemLimit = Readonly<number>

// This is the Cart state
type Cart = {
  strainItems: Array<StrainItem>
  maxItems: CartItemLimit
}

const initialState: Cart = {
  strainItems: [],
  maxItems: 12,
}

const cartAtom = atom<Cart>(initialState)
const strainItemsAtom = atom((get) => get(cartAtom).strainItems)
const maxItemsAtom = atom((get) => get(cartAtom).maxItems)
const isFullAtom = atom(
  (get) => get(strainItemsAtom).length === get(maxItemsAtom),
)
// eslint-disable-next-line unicorn/no-null
const deleteItemAtom = atom(null, (get, set, deleteId) => {
  get(strainItemsAtom).filter((item) => item.id !== deleteId)
})

export { type Cart, cartAtom, strainItemsAtom, isFullAtom, deleteItemAtom }
