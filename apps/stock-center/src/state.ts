import { atom } from "jotai"
import { type Strain, Plasmid } from "dicty-graphql-schema"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type PlasmidItem = Pick<Plasmid, "id" | "summary" | "name"> & PurchaseProperties

type Cart = {
  strainItems: StrainItem[]
  plasmidItems: PlasmidItem[]
  maxItems: Readonly<number>
}

const initialState: Cart = {
  strainItems: [],
  plasmidItems: [],
  maxItems: 12,
}

export const cartAtom = atom<Cart>(initialState)

// @ts-ignore https://github.com/jotaijs/jotai-optics/issues/6
// export const cartItemsAtom = focusAtom(cartAtom, (optic) => optic.prop("items"))
