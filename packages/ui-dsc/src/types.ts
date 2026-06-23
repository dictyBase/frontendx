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
type PlasmidCartItem = PlasmidItem & PurchaseProperties
type CatalogCartItem = CatalogItem & PurchaseProperties
type CartItemLimit = Readonly<number>
type Cart = {
  strainItems: Array<StrainCartItem>
  plasmidItems: Array<PlasmidCartItem>
}
type OrderState = {
  orderID: string
  formData: FormData
  cartItems: Array<CatalogCartItem>
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

type LinkItem = {
  label: string
  href: string
  external?: boolean
}

export type {
  StrainItem,
  PlasmidItem,
  CatalogItem,
  StrainCartItem,
  PlasmidCartItem,
  CatalogCartItem,
  CartItemLimit,
  Cart,
  OrderState,
  DetailsRow,
  LinkItem,
}
