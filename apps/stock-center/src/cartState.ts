import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type StrainItems = Array<StrainItem>

const strainItemsAtom = atom<Array<StrainItem>>([])
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
  strainItemsAtom,
  strainItemAtomsAtom,
  removeItemAtom,
}
