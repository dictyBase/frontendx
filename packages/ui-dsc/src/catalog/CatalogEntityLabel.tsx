import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { getEntityPresentation } from "./catalogEntityPresentation"
import type { CatalogEntityType } from "./catalogListItemData"

type CatalogEntityLabelProperties = {
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
}

/**
 * Renders the entity glyph, the uppercase entity name, and the stock id,
 * all tinted with the entity's accent colour. Used in the header of a
 * {@link CatalogListItem}.
 *
 * @param entity - Whether the item is a strain or a plasmid.
 * @param id - The stock id to display next to the entity name.
 */
const CatalogEntityLabel = ({ entity, id }: CatalogEntityLabelProperties) => {
  const { color, Icon, label } = getEntityPresentation(entity)

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Icon aria-hidden sx={{ color, fontSize: "1.25rem" }} />
      <Typography
        component="span"
        sx={{
          color,
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
        {label}
      </Typography>
      <Box
        component="span"
        sx={{
          color: "text.secondary",
          fontSize: "0.8rem",
        }}>
        {id}
      </Box>
    </Stack>
  )
}

export { CatalogEntityLabel }
export type { CatalogEntityLabelProperties }
