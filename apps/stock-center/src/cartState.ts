import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type Strain } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type StrainItems = Array<StrainItem>

const strainItemsAtom = atom<Array<StrainItem>>([])
const strainItemAtomsAtom = splitAtom(strainItemsAtom)

export {
  type StrainItems,
  type StrainItem,
  strainItemsAtom,
  strainItemAtomsAtom,
}
