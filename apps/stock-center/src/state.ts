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

const initialFormValues = {
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
  comments: "",
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

const orderFormAtom = atom(initialFormValues)
const orderStepAtom = atom<OrderSteps>(OrderSteps.SHIPPING)

export {
  type StrainItem,
  type Cart,
  OrderSteps,
  cartAtom,
  strainItemsAtom,
  strainItemAtomsAtom,
  removeItemAtom,
  orderFormAtom,
  orderStepAtom,
}
