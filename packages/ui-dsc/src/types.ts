import type { Strain, Plasmid } from "dicty-graphql-schema"
import { FormData } from "./utils/initialFormValues"

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
  type StrainItem,
  type PlasmidItem,
  type CatalogItem,
  type StrainCartItem,
  type StrainCartItem as CartItem,
  type CartItemLimit,
  type Cart,
  type OrderState,
  type DetailsRow,
}
