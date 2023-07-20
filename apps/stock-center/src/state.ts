/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import { splitAtom } from "jotai/utils"
import { type Strain } from "dicty-graphql-schema"

// CART STATE
type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type Cart = {
  strainItems: Array<StrainItem>
}

const initialCart: Cart = {
  strainItems: [],
}

const cartAtom = atom<Cart>(initialCart)

const strainItemsAtom = atom(
  (get) => get(cartAtom).strainItems,
  (get, set, strainItems: Array<StrainItem>) =>
    set(cartAtom, (previous) => ({ ...previous, strainItems })),
)
const strainItemAtomsAtom = splitAtom(strainItemsAtom)

const removeItemAtom = atom(null, (get, set, removeId) =>
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== removeId),
  ),
)

const resetCartAtom = atom(null, (get, set) => set(cartAtom, initialCart))

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
  removeItemAtom,
  shippingFormAtom,
  paymentFormAtom,
  orderAtom,
  orderStepAtom,
  submitErrorAtom,
}
