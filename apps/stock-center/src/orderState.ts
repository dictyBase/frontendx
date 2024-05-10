/* eslint-disable unicorn/no-null */
import { atom } from "jotai"
import type {
  PaymentFormData,
  ShippingFormData,
  OrderState,
} from "./types"

enum OrderSteps {
  SHIPPING,
  PAYMENT,
  SUBMIT,
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
  OrderSteps,
  shippingFormAtom,
  initialPaymentValues,
  paymentFormAtom,
  orderAtom,
  orderStepAtom,
  submitErrorAtom,
}
