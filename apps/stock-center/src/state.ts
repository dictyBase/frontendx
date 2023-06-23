import { atom } from "jotai"
import { focusAtom } from "jotai-optics"
import { type Strain, Plasmid } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type PlasmidItem = Pick<Plasmid, "id" | "summary" | "name"> & PurchaseProperties

type Cart = {
  strainItems: StrainItem[]
  plasmidItems: PlasmidItem[]
}

type CartItemLimit = Readonly<number>

const MAX_ITEMS: CartItemLimit = 12

const initialState: Cart = {
  strainItems: [],
  plasmidItems: [],
}

export const cartAtom = atom<Cart>(initialState)
// @ts-ignore https://github.com/jotaijs/jotai-optics/issues/6
export const plasmidItemsAtom = focusAtom(cartAtom, (optic) =>
  optic.prop("plasmidItems"),
)
// @ts-ignore https://github.com/jotaijs/jotai-optics/issues/6
export const strainItemsAtom = focusAtom(cartAtom, (optic) =>
  optic.prop("strainItems"),
)

export const totalItemsAtom = atom((get) => [
  ...get(plasmidItemsAtom),
  ...get(strainItemsAtom),
])
