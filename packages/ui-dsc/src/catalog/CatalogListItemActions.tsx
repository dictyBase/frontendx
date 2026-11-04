import type { ReactNode } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { AvailabilityIndicator } from "./AvailabilityIndicator"
import type { CatalogEntityType } from "./catalogListItemData"

type CatalogListItemActionsProperties = {
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
  /** Whether the item is currently in stock. */
  inStock: boolean
  /** The action rendered on the right, e.g. an add-to-cart button. */
  action: ReactNode
}

/**
 * Renders the header of a {@link CatalogListItem}: the entity label on the
 * left, and the availability indicator plus the action slot on the right.
 * Tinted with the entity's accent colour.
 *
 * @param entity - Whether the item is a strain or a plasmid.
 * @param id - The stock id to display next to the entity name.
 * @param inStock - Whether the item is currently in stock.
 * @param action - The action rendered on the right, e.g. an add-to-cart button.
 */
const CatalogListItemActions = ({
  id,
  inStock,
  action,
}: CatalogListItemActionsProperties) => (
  <Stack direction="column" alignItems="center" gap={1.25}>
    <AvailabilityIndicator inStock={inStock} />
    {action}
  </Stack>
)

export { CatalogListItemActions }
export type { CatalogListItemActionsProperties }
