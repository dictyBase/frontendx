/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { pipe } from "fp-ts/function"
import { concat, reduce } from "fp-ts/Array"
import type { StrainItem, PlasmidItem } from "./types"

// CART STATE
type PurchaseProperties = { fee: Readonly<number> }
type StrainCartItem = StrainItem & PurchaseProperties
type PlasmidCartItem = PlasmidItem & PurchaseProperties
type CartItem = StrainCartItem | PlasmidCartItem

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

const maxItemsAtom = atom((get) => get(cartAtom).maxItems)

const remainingCartSpaceAtom = atom(
  (get) =>
    get(maxItemsAtom) -
    (get(strainItemsAtom).length + get(plasmidItemsAtom).length),
)

const addStrainItemsAtom = atom(
  null,
  (get, set, newItems: Array<StrainCartItem>) => {
    set(
      strainItemsAtom,
      pipe(
        get(strainItemsAtom),
        concat(newItems.slice(0, get(remainingCartSpaceAtom))),
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
        concat(newItems.slice(0, get(remainingCartSpaceAtom))),
      ),
    )
  },
)

const removeItemAtom = atom(null, (get, set, removeId) =>
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== removeId),
  ),
)

const currentCartQuantityAtom = atom((get) =>
  pipe(
    get(strainItemsAtom),
    reduce(0, (sum) => sum + 1),
  ),
)

const isFullAtom = atom(
  (get) => get(currentCartQuantityAtom) === get(maxItemsAtom),
)

const resetCartAtom = atom(null, (_, set) => set(cartAtom, initialCart))

// ORDER STATE
enum OrderSteps {
  SHIPPING,
  PAYMENT,
  SUBMIT,
}

type ShippingFormData = {
  firstName: string
  lastName: string
  email: string
  organization: string
  lab: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  shippingAccount: string
  shippingAccountNumber: string
  additionalInformation: string
}

type PaymentFormData = {
  payerFirstName: string
  payerLastName: string
  payerEmail: string
  payerOrganization: string
  payerLab: string
  payerAddress1: string
  payerAddress2: string
  payerCity: string
  payerState: string
  payerZip: string
  payerCountry: string
  payerPhone: string
  paymentMethod: string
  purchaseOrderNum: string
}

type OrderState = {
  orderID: string
  formData: ShippingFormData & PaymentFormData
  cartItems: Array<StrainCartItem>
  cartTotal: string
}

const initialOrder: OrderState = {
  orderID: "",
  formData: {} as ShippingFormData & PaymentFormData,
  cartItems: [],
  cartTotal: "$0.00",
}

const initialShippingValues: ShippingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  lab: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phone: "",
  shippingAccount: "DHL",
  shippingAccountNumber: "",
  additionalInformation: "",
}

const initialPaymentValues: PaymentFormData = {
  payerFirstName: "",
  payerLastName: "",
  payerEmail: "",
  payerOrganization: "",
  payerLab: "",
  payerAddress1: "",
  payerAddress2: "",
  payerCity: "",
  payerState: "",
  payerZip: "",
  payerCountry: "",
  payerPhone: "",
  paymentMethod: "purchaseOrder",
  purchaseOrderNum: "",
}

const shippingFormAtom = atom(initialShippingValues)
const paymentFormAtom = atom(initialPaymentValues)
const orderAtom = atom(initialOrder)
const orderStepAtom = atom(OrderSteps.SHIPPING)
const submitErrorAtom = atom(false)

export {
  type StrainCartItem,
  type Cart,
  type ShippingFormData,
  type PaymentFormData,
  type OrderState,
  OrderSteps,
  cartAtom,
  resetCartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  addStrainItemsAtom,
  addPlasmidItemsAtom,
  removeItemAtom,
  currentCartQuantityAtom,
  maxItemsAtom,
  isFullAtom,
  shippingFormAtom,
  initialPaymentValues,
  paymentFormAtom,
  orderAtom,
  orderStepAtom,
  submitErrorAtom,
}
