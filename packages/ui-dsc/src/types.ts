import { type Strain } from "dicty-graphql-schema"
import { FormData } from "./utils/initialFormValues"

type PurchaseProperties = { quantity: number; fee: Readonly<number> }

type StrainCartItem = Pick<Strain, "id" | "summary" | "label"> &
  PurchaseProperties
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: Array<StrainCartItem>
}
type OrderState = {
  orderID: string
  formData: FormData
  cartItems: Array<StrainCartItem>
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
  type StrainCartItem as CartItem,
  type StrainCartItem,
  type CartItemLimit,
  type Cart,
  type OrderState,
  type DetailsRow,
}
