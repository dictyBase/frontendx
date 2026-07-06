import { useSetAtom, useAtomValue } from "jotai"
import { Button } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { fees } from "@dictybase/ui-dsc"
import { remainingCartSpaceAtom, addStrainItemsAtom } from "../../../cartState"
import type { CatalogStrain } from "../types/catalog"

type AddToCartButtonProperties = {
  /** Strain to add to cart */
  strain: CatalogStrain
  /** Callback after successful add */
  onAdd?: () => void
}

/**
 * AddToCartButton is a table row action button that adds a strain to the cart.
 * It handles cart capacity limits and provides visual feedback.
 * This is a state-dependent component that uses Jotai atoms.
 */
const AddToCartButton = ({ strain, onAdd }: AddToCartButtonProperties) => {
  const addStrainItems = useSetAtom(addStrainItemsAtom)
  const remainingSpace = useAtomValue(remainingCartSpaceAtom)

  const isDisabled = remainingSpace === 0 || !strain.in_stock

  const handleClick = () => {
    if (isDisabled) return

    const strainWithFee = {
      ...strain,
      fee: fees.STRAIN_FEE,
    }

    addStrainItems([strainWithFee])
    onAdd?.()
  }

  return (
    <Button
      variant="outlined"
      size="small"
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={
        isDisabled
          ? "Cannot add to cart - cart is full or item unavailable"
          : `Add ${strain.label} to cart`
      }
      startIcon={<ShoppingCartIcon />}
      sx={{
        borderColor: "#bfe0c7",
        backgroundColor: "#e9ffe3",
        color: "#2d3748",
        fontWeight: 600,
        fontSize: "13px",
        textTransform: "none",
        padding: "8px 16px",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "#2c5282",
          color: "white",
          borderColor: "#2c5282",
          transform: "translateY(-1px)",
        },
        "&:disabled": {
          backgroundColor: "#f7fafc",
          color: "#a0aec0",
          borderColor: "#e2e8f0",
        },
      }}>
      {isDisabled && remainingSpace === 0 ? "Cart Full" : "Add"}
    </Button>
  )
}

export { AddToCartButton }
