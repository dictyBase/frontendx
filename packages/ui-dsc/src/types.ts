import { type Strain } from "dicty-graphql-schema"
import { FormData } from "./utils/initialFormValues"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }
type StrainItem = Pick<Strain, "id" | "summary" | "label"> & PurchaseProperties
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: Array<StrainItem>
}
type OrderState = {
  orderID: string
  formData: FormData
  cartItems: Array<StrainItem>
  cartTotal: string
}

export { type StrainItem, type CartItemLimit, type Cart, type OrderState }
