/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import {
  concat as Aconcat,
  reduce as Areduce,
  uniq as Auniq,
} from "fp-ts/Array"
import { fromEquals } from "fp-ts/Eq"
import type { StrainCartItem, PlasmidCartItem, CatalogItem } from "./types"

type Cart = {
  plasmidItems: Array<PlasmidCartItem>
  strainItems: Array<StrainCartItem>
  maxItems: number
}

const initialCart: Cart = {
  strainItems: [],
  plasmidItems: [],
  maxItems: 12,
}

const cartAtom = atom<Cart>(initialCart)

const strainItemsAtom = atom(
  (get) => get(cartAtom).strainItems,
  (_, set, strainItems: Array<StrainCartItem>) =>
    set(cartAtom, (previous) => ({ ...previous, strainItems })),
)

const plasmidItemsAtom = atom(
  (get) => get(cartAtom).plasmidItems,
  (_, set, plasmidItems: Array<PlasmidCartItem>) =>
    set(cartAtom, (previous) => ({ ...previous, plasmidItems })),
)

const strainItemAtomsAtom = splitAtom(strainItemsAtom)
const plasmidItemAtomsAtom = splitAtom(plasmidItemsAtom)

const maxItemsAtom = atom((get) => get(cartAtom).maxItems)

const remainingCartSpaceAtom = atom(
  (get) =>
    get(maxItemsAtom) -
    (get(strainItemsAtom).length + get(plasmidItemsAtom).length),
)

const strainEq = fromEquals<StrainCartItem>((a, b) => a.id === b.id)
const plasmidEq = fromEquals<PlasmidCartItem>((a, b) => a.id === b.id)

const addStrainItemsAtom = atom(
  null,
  (get, set, newItems: Array<StrainCartItem>) => {
    set(
      strainItemsAtom,
      pipe(
        get(strainItemsAtom),
        Aconcat(newItems.slice(0, get(remainingCartSpaceAtom))),
        Auniq(strainEq),
      ),
    )
  },
)

const addPlasmidItemsAtom = atom(
  null,
  (get, set, newItems: Array<PlasmidCartItem>) => {
    set(
      plasmidItemsAtom,
      pipe(
        get(plasmidItemsAtom),
        Aconcat(newItems.slice(0, get(remainingCartSpaceAtom))),
        Auniq(plasmidEq),
      ),
    )
  },
)

const removeItemAtom = atom(null, (get, set, removedItem: CatalogItem) => {
  match(removedItem)
    .with({ __typename: "Strain" }, () =>
      set(
        strainItemsAtom,
        get(strainItemsAtom).filter((item) => item.id !== removedItem.id),
      ),
    )
    .with({ __typename: "Plasmid" }, () =>
      set(
        plasmidItemsAtom,
        get(plasmidItemsAtom).filter((item) => item.id !== removedItem.id),
      ),
    )
    .otherwise(() => {})
})

const currentCartQuantityAtom = atom((get) =>
  pipe(
    get(strainItemsAtom),
    Areduce(0, (sum) => sum + 1),
  ),
)

const isFullAtom = atom(
  (get) => get(currentCartQuantityAtom) === get(maxItemsAtom),
)

const resetCartAtom = atom(null, (_, set) => set(cartAtom, initialCart))

export {
  type Cart,
  cartAtom,
  resetCartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  plasmidItemsAtom,
  plasmidItemAtomsAtom,
  addStrainItemsAtom,
  addPlasmidItemsAtom,
  removeItemAtom,
  currentCartQuantityAtom,
  maxItemsAtom,
  isFullAtom,
}
