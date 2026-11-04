import type { ReactNode } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { CatalogEntityLabel } from "./CatalogEntityLabel"
import { AvailabilityIndicator } from "./AvailabilityIndicator"
import type { CatalogEntityType } from "./catalogListItemData"

type CatalogListItemHeaderProperties = {
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
  /** Whether the item is currently in stock. */
  inStock: boolean
  /** The action rendered on the right, e.g. an add-to-cart button. */
  action: ReactNode
  /** Primary display title: the strain label or the plasmid name. */
  title: string
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
const CatalogListItemHeader = ({
  title,
  entity,
  id,
  inStock,
  action,
}: CatalogListItemHeaderProperties) => (
  <Box
    sx={(t) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      px: 4,
      backgroundColor: t.palette.background.default,
      borderBottom: 1,
      borderColor: t.palette.secondary.main,
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
    })}>
    <CatalogEntityLabel title={title} entity={entity} id={id} />
    <Stack direction="row" alignItems="center" gap={1.25}>
      <AvailabilityIndicator inStock={inStock} />
      {action}
    </Stack>
  </Box>
)

export { CatalogListItemHeader }
export type { CatalogListItemHeaderProperties }
