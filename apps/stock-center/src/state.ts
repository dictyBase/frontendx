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

// eslint-disable-next-line unicorn/no-null
const removeItemAtom = atom(null, (get, set, removeId) =>
  set(
    strainItemsAtom,
    get(strainItemsAtom).filter((item) => item.id !== removeId),
  ),
)

// ORDER STATE
enum OrderSteps {
  SHIPPING,
  PAYMENT,
  SUBMIT,
}

type OrderFormValues = {
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
  comments: string
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
  [key: string]: string
}

const orderStepAtom = atom<OrderSteps>(OrderSteps.SHIPPING)

export {
  type StrainItem,
  type Cart,
  type OrderFormValues,
  OrderSteps,
  cartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  removeItemAtom,
  orderStepAtom,
}
