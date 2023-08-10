/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type Strain } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { partitionMap, reduce } from "fp-ts/Array"
import { left as Eleft, right as Eright } from "fp-ts/Either"
// CART STATE
type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type Cart = {
  strainItems: Array<StrainItem>
  maxItems: number
}

const initialCart: Cart = {
  strainItems: [],
  maxItems: 12,
}

const cartAtom = atom<Cart>(initialCart)

const strainItemsAtom = atom(
  (get) => get(cartAtom).strainItems,
  (get, set, strainItems: Array<StrainItem>) =>
    set(cartAtom, (previous) => ({ ...previous, strainItems })),
)
const strainItemAtomsAtom = splitAtom(strainItemsAtom)

const increaseQuantityIfPresent =
  (newItem: StrainItem) => (cartItem: StrainItem) =>
    cartItem.id === newItem.id
      ? // quantity summation could probably be solved more functionally too
        Eright({
          ...cartItem,
          quantity: cartItem.quantity + newItem.quantity,
        } as StrainItem)
      : Eleft(cartItem)

const addItemAtom = atom(null, (get, set, newItem: StrainItem) => {
  set(
    strainItemsAtom,
    pipe(
      get(strainItemsAtom),
      partitionMap(increaseQuantityIfPresent(newItem)),
      // Find out how to make this more declarative
      // Add check if adding would exceed max cart items
      ({ left, right }) => ({
        left,
        right: right.length === 0 ? [newItem] : right,
      }),
      ({ left, right }) => [...left, ...right],
    ),
  )
})

const removeItemAtom = atom(null, (get, set, removeId) =>
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== removeId),
  ),
)

const maxItemsAtom = atom((get) => get(cartAtom).maxItems)

const currentCartQuantityAtom = atom((get) =>
  pipe(
    get(strainItemsAtom),
    reduce(0, (sum, item) => sum + item.quantity),
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
  cartItems: Array<StrainItem>
  cartTotal: string
}

const initialOrder: OrderState = {
  orderID: "",
  formData: {} as ShippingFormData & PaymentFormData,
  cartItems: [],
  cartTotal: "$0.00",
}

const initialShippingValues = {
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
  shippingAccount: "",
  shippingAccountNumber: "",
  additionalInformation: "",
}

const initialPaymentValues = {
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
  paymentMethod: "",
  purchaseOrderNum: "",
}

const shippingFormAtom = atom(initialShippingValues)
const paymentFormAtom = atom(initialPaymentValues)
const orderAtom = atom(initialOrder)
const orderStepAtom = atom(OrderSteps.SHIPPING)
const submitErrorAtom = atom(false)

export {
  type StrainItem,
  type Cart,
  type ShippingFormData,
  type PaymentFormData,
  type OrderState,
  OrderSteps,
  cartAtom,
  resetCartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  addItemAtom,
  removeItemAtom,
  isFullAtom,
  shippingFormAtom,
  paymentFormAtom,
  orderAtom,
  orderStepAtom,
  submitErrorAtom,
}
