import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type StrainItems = Array<StrainItem>

type Cart = {
  strainItems: StrainItems
}

const initialCart = {
  strainItems: [],
}

const cartAtom = atom<Cart>(initialCart)

// const strainItemsAtom = atom<Array<StrainItem>>([])
const strainItemsAtom = atom(
  (get) => get(cartAtom).strainItems,
  (get, set, strainItems: StrainItems) =>
    set(cartAtom, (previous) => ({ ...previous, strainItems })),
)
const strainItemAtomsAtom = splitAtom(strainItemsAtom)

// eslint-disable-next-line unicorn/no-null
const removeItemAtom = atom(null, (get, set, removeId) =>
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== removeId),
  ),
)

export {
  type StrainItems,
  type StrainItem,
  cartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  removeItemAtom,
}
