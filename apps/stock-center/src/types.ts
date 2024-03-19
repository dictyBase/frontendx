import type { Strain, Plasmid } from "dicty-graphql-schema"

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

export {
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
}
