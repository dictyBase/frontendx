/* eslint-disable unicorn/prefer-add-event-listener */
/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom, atomWithStorage } from "jotai/utils"
import { SyncStorage } from "jotai/vanilla/utils/atomWithStorage"
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import {
  size as Asize,
  concat as Aconcat,
  concatW as AconcatW,
  uniq as Auniq,
} from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
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
// eslint-disable-next-line compat/compat
const dscChannel = new BroadcastChannel(NAMESPACE)

enum MessageType {
  "INITIALIZE_CART",
  "UPDATE_CART",
  "CLEAR_CART",
}

const cartStorageGetOrElse = (key: string, defaultValue: Cart) =>
  pipe(
    sessionStorage.getItem(key),
    OfromNullable,
    Omap(JSON.parse),
    OgetOrElse(() => defaultValue),
  )

const storage: SyncStorage<Cart> = {
  getItem: (key, initialValue) => {
    dscChannel.postMessage({ type: MessageType.INITIALIZE_CART })
    return cartStorageGetOrElse(key, initialValue)
  },
  setItem: (key, value) => {
    dscChannel.postMessage({ type: MessageType.UPDATE_CART, cart: value })
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    dscChannel.postMessage({ type: MessageType.CLEAR_CART, cart: initialCart })
    sessionStorage.removeItem(key)
  },
  subscribe(key, callback, initialValue) {
    dscChannel.onmessage = (
      event: MessageEvent<{ type: MessageType; cart?: Cart }>,
    ) => {
      match(event.data)
        .with({ type: MessageType.INITIALIZE_CART }, () => {
          dscChannel.postMessage({
            type: MessageType.UPDATE_CART,
            cart: cartStorageGetOrElse(key, initialValue),
          })
        })
        .with({ type: MessageType.UPDATE_CART }, ({ cart }) => {
          pipe(
            cart,
            OfromNullable,
            Omap((c) => {
              sessionStorage.setItem(key, JSON.stringify(c))
              callback(c)
            }),
          )
        })
        .with({ type: MessageType.CLEAR_CART }, () => {
          sessionStorage.setItem(key, JSON.stringify(initialCart))
          callback(initialCart)
        })
        .otherwise(() => {})
    }
    return () => {
      dscChannel.close()
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
  dscChannel,
}
