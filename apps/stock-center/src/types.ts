import type { Strain, Plasmid } from "dicty-graphql-schema"
import { RESET } from "jotai/utils"

type PurchaseProperties = { fee: Readonly<number> }

type StrainItem = Pick<
  Strain,
  "__typename" | "id" | "summary" | "label" | "in_stock"
>
type PlasmidItem = Pick<
  Plasmid,
  "__typename" | "id" | "summary" | "name" | "in_stock"
>
type CatalogItem = StrainItem | PlasmidItem
type StrainCartItem = StrainItem & PurchaseProperties
type PlasmidCartItem = PlasmidItem & PurchaseProperties
type CatalogCartItem = CatalogItem & PurchaseProperties
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: Array<StrainCartItem>
  plasmidItems: Array<PlasmidCartItem>
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
  phoneCountryCode: string
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
  payerPhoneCountryCode: string
  payerPhone: string
  paymentMethod: string
  purchaseOrderNum: string
}

type OrderState = {
  orderID: string
  formData: ShippingFormData & PaymentFormData
  cartItems: Array<CatalogCartItem>
  cartTotal: string
}

enum ErrorType {
  MISSING_CONTENT_ID,
  ACCESS_TOKEN_ERROR,
  USER_INFO_ERROR,
  CREATE_FAILURE,
  FETCH_FAILURE,
  UPDATE_FAILURE,
  DELETE_FAILURE,
}

type ContentError = {
  errorType: ErrorType
  message: string
}

const missingContentIdError = {
  errorType: ErrorType.MISSING_CONTENT_ID,
  message: "Content ID missing",
}

const userInfoError = {
  errorType: ErrorType.USER_INFO_ERROR,
  message: "Could not get user info",
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const createFailureError = {
  errorType: ErrorType.CREATE_FAILURE,
  message: "Could not create content",
}

const fetchContentError = {
  errorType: ErrorType.FETCH_FAILURE,
  message: "Could not fetch content",
}

const updateFailureError = {
  errorType: ErrorType.UPDATE_FAILURE,
  message: "Could not update content",
}

const deleteFailureError = {
  errorType: ErrorType.DELETE_FAILURE,
  message: "Could not delete content",
}

// Copied from "jotai/utils", since it is not exported from the package.
type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((previous: Value) => Value | typeof RESET)

export {
  missingContentIdError,
  userInfoError,
  accessTokenError,
  createFailureError,
  updateFailureError,
  fetchContentError,
  deleteFailureError,
  type ContentError,
  type StrainItem,
  type PlasmidItem,
  type CatalogItem,
  type StrainCartItem,
  type PlasmidCartItem,
  type StrainCartItem as CartItem,
  type CatalogCartItem,
  type CartItemLimit,
  type Cart,
  type ShippingFormData,
  type PaymentFormData,
  type OrderState,
  type SetStateActionWithReset,
}
