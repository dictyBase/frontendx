import { atom } from "jotai"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type StrainItems = Array<StrainItem>
type CartItemLimit = Readonly<number>

// This is the Cart state

const strainItemsAtom = atom<Array<StrainItem>>([])
const maxItemsAtom = atom<CartItemLimit>(12)

const isFullAtom = atom(
  (get) => get(strainItemsAtom).length === get(maxItemsAtom),
)
// eslint-disable-next-line unicorn/no-null
const deleteItemAtom = atom(null, (get, set, deleteId) => {
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== deleteId),
  )
})

export {
  type StrainItems,
  type StrainItem,
  strainItemsAtom,
  isFullAtom,
  deleteItemAtom,
}
