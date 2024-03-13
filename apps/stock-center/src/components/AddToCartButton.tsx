import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { useSetAtom } from "jotai"
import { fees } from "@dictybase/ui-dsc"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/Array"
import { match, P } from "ts-pattern"
import { addStrainItemsAtom, addPlasmidItemsAtom } from "../state"
import type { StrainItem, PlasmidItem, CatalogItem } from "../types"

const useStyles = makeStyles(({ palette }) => ({
  cartButton: {
    color: palette.secondary.main,
  },
}))

type Properties = {
  /** Stock data */
  items: Array<CatalogItem>
  /** Function to toggle the AddToCartDialog */
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
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
  const classes = useStyles()
  const addStrainItems = useSetAtom(addStrainItemsAtom)
  const addPlasmidItems = useSetAtom(addPlasmidItemsAtom)

  const handleClick = () => {
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
    <>
      <strong>
        <IconButton
          size={size}
          className={classes.cartButton}
          onClick={handleClick}
          title="Add to shopping cart"
          aria-label="Add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </strong>
    </>
  )
}

export { AddToCartButton }
