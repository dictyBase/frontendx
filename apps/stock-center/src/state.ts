/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { focusAtom } from "jotai-optics"
import { CartItemWithQuantity } from "@dictybase/ui-dsc"

const addedItems = [
  {
    id: "DBS0238532",
    name: "γS13",
    fee: "$30.00",
    summary: "test",
    quantity: 1,
  },
  {
    id: "DBS0238534",
    name: "γS14",
    fee: "$30.00",
    summary: "test",
    quantity: 1,
  },
  {
    id: "502",
    name: "(Myc)2-apm1",
    fee: "$15.00",
    summary: "test",
    quantity: 2,
  },
]

const cartLimit = 12
const storageKey = "dscCart"
const maxKey = "dscMaxItems"

type CartState = {
  addedItems: Array<CartItemWithQuantity>
  isFull: boolean
}

const initialState = {
  addedItems:
    addedItems || JSON.parse(localStorage.getItem(storageKey) || "[]"),
  isFull: JSON.parse(localStorage.getItem(maxKey) || "false"),
}

const cartAtom = atom<CartState>(initialState)
// @ts-ignore https://github.com/jotaijs/jotai-optics/issues/6
export const addedItemsAtom = focusAtom(cartAtom, (optic) =>
  optic.prop("addedItems"),
)
// @ts-ignore
export const isFullAtom = focusAtom(cartAtom, (optic) => optic.prop("isFull"))

export const removeCartItemAtom = atom(null, (get, set, update) => {})
