import {
  type MouseEvent,
  type ChangeEvent,
  type ReactNode,
  useState,
} from "react"
import Grid from "@material-ui/core/Grid"
import { OutlinedDropdown, SecondaryButton } from "@dictybase/ui-dsc"
import { useSetAtom, useAtomValue } from "jotai"
import { addItemsAtom, currentCartQuantityAtom, maxItemsAtom } from "../state"

type AddToCartButtonProperties = {
  children?: ReactNode
}

const AddToCartControl = ({
  children = "Add to Cart",
}: AddToCartButtonProperties) => {
  const addItem = useSetAtom(addItemsAtom)
  const maxItems = useAtomValue(maxItemsAtom)
  const currentCartQuantity = useAtomValue(currentCartQuantityAtom)
  const allowedQuantitiesToAdd = new Array(maxItems - currentCartQuantity)
    .fill(0)
    .map((_, index) => index + 1)
  const [selectedQuantity, setSelectedQuantity] = useState(
    allowedQuantitiesToAdd[0],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(Number(event.target.value))
  }
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // addItem
  }
  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid item>
        <OutlinedDropdown
          label="Qty"
          handleChange={handleChange}
          dropdownValues={allowedQuantitiesToAdd}
          inputValue={selectedQuantity}
        />
      </Grid>
      <Grid item>
        <SecondaryButton onClick={onClick}>{children}</SecondaryButton>
      </Grid>
    </Grid>
  )
}

export { AddToCartControl }
