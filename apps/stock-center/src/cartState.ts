/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom, atomWithStorage, createJSONStorage } from "jotai/utils"
import { SyncStorage } from "jotai/vanilla/utils/atomWithStorage"
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import {
  size as Asize,
  concat as Aconcat,
  concatW as AconcatW,
  uniq as Auniq,
} from "fp-ts/Array"
import { fromEquals } from "fp-ts/Eq"
import type { StrainCartItem, PlasmidCartItem, CatalogItem } from "./types"
import { NAMESPACE } from "./namespace"

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
const bc = new BroadcastChannel(NAMESPACE)

// const storage = createJSONStorage<Cart>(() => sessionStorage)
const storage: SyncStorage<Cart> = {
  getItem: (key, initialValue) => {
    const saved = sessionStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  },
  setItem: (key, value) => {
    bc.postMessage({ cart: value })
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    bc.postMessage({ cart: initialCart })
    sessionStorage.removeItem(key)
  },
  subscribe(key, callback, initialValue) {
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    bc.onmessage = (event) => {
      sessionStorage.setItem("cart", JSON.stringify(event.data.cart))
      callback(event.data.cart)
    }
    return () => {
      bc.close()
    }
  },
}

const cartAtom = atomWithStorage<Cart>(NAMESPACE, initialCart, storage, {
  getOnInit: true,
})

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

const addCartItemsAtom = atom(
  null,
  (get, set, newItems: Array<PlasmidCartItem | StrainCartItem>) => {
    match(newItems)
      .with(P.array({ __typename: "Strain" }), () =>
        set(
          strainItemsAtom,
          pipe(
            get(strainItemsAtom),
            Aconcat(
              newItems.slice(
                0,
                get(remainingCartSpaceAtom),
              ) as Array<StrainCartItem>,
            ),
            Auniq(strainEq),
          ),
        ),
      )
      .with(P.array({ __typename: "Plasmid" }), () =>
        set(
          plasmidItemsAtom,
          pipe(
            get(plasmidItemsAtom),
            Aconcat(
              newItems.slice(
                0,
                get(remainingCartSpaceAtom),
              ) as Array<PlasmidCartItem>,
            ),
            Auniq(plasmidEq),
          ),
        ),
      )
      .otherwise(() => {})
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
  pipe(get(strainItemsAtom), AconcatW(get(plasmidItemsAtom)), Asize),
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
  addCartItemsAtom,
  removeItemAtom,
  currentCartQuantityAtom,
  maxItemsAtom,
  isFullAtom,
}
