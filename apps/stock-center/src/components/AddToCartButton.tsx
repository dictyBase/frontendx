import {
  type MouseEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react"
import IconButton from "@mui/material/IconButton"
import { indigo } from "@mui/material/colors"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useSetAtom } from "jotai"
import { fees } from "@dictybase/ui-dsc"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/Array"
import { match, P } from "ts-pattern"
import { addStrainItemsAtom, addPlasmidItemsAtom } from "../cartState"
import type { StrainItem, PlasmidItem, CatalogItem } from "../types"

type Properties = {
  /** Stock data */
  items: Array<CatalogItem>
  /** Function to toggle the AddToCartDialog */
  setShowDialog: Dispatch<SetStateAction<boolean>>
  /** Size of icon */
  size?: "small" | "medium" | undefined
}

const appendStrainFee = (strainItem: StrainItem) => ({
  ...strainItem,
  fee: fees.STRAIN_FEE,
})
const appendPlasmidFee = (plasmidItem: PlasmidItem) => ({
  ...plasmidItem,
  fee: fees.PLASMID_FEE,
})

/**
 * AddToCartButton appears on the catalog page if the stock is available
 * for purchase.
 */

const AddToCartButton = ({
  items,
  size = "medium",
  setShowDialog,
}: Properties) => {
  const addStrainItems = useSetAtom(addStrainItemsAtom)
  const addPlasmidItems = useSetAtom(addPlasmidItemsAtom)

  const handleClick: MouseEventHandler = (event) => {
    event.stopPropagation()
    match(items)
      .with(P.array({ __typename: "Strain" }), (strainItems) => {
        pipe(strainItems, map(appendStrainFee), addStrainItems)
        setShowDialog(true)
      })
      .with(P.array({ __typename: "Plasmid" }), (plasmidItems) => {
        pipe(plasmidItems, map(appendPlasmidFee), addPlasmidItems)
        setShowDialog(true)
      })
      .otherwise(() => {})
  }

  return (
    <IconButton
      size={size}
      sx={{ color: indigo[600] }}
      title="Add to shopping cart"
      aria-label="Add to shopping cart"
      onClick={handleClick}>
      <AddShoppingCartIcon />
    </IconButton>
  )
}

export { AddToCartButton }
