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

type DetailsRow = {
  /** Data object ID */
  id: number
  /** Title for row */
  title: string
  /** Content to display in row */
  content: string | JSX.Element | JSX.Element[] | undefined | null
}

export {
  type StrainItem as CartItem,
  type StrainItem,
  type CartItemLimit,
  type Cart,
  type OrderState,
  type DetailsRow,
}
