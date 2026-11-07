import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { getEntityPresentation } from "./catalogEntityPresentation"
import type { CatalogEntityType } from "./catalogListItemData"

type CatalogEntityLabelProperties = {
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Primary display title: the strain label or the plasmid name. */
  title: string
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
}

/**
 * Renders the entity as a basic MUI `Chip` with a leading icon, followed by
 * the stock id, all tinted with the entity's accent colour. Used in the
 * header of a {@link CatalogListItem}.
 *
 * @see {@link https://v5.mui.com/material-ui/react-chip/#basic-chip}
 * @param entity - Whether the item is a strain or a plasmid.
 * @param id - The stock id to display next to the entity name.
 */
const CatalogEntityLabel = ({
  title,
  entity,
  id,
}: CatalogEntityLabelProperties) => {
  const { color, bg, Icon, label, border } = getEntityPresentation(entity)

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Chip
        icon={<Icon aria-hidden />}
        label={label}
        size="small"
        sx={{
          color,
          backgroundColor: bg,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: border,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          "& .MuiChip-icon": {
            color,
          },
        }}
      />
      <Typography
        variant="subtitle1"
        color="text.primary"
        sx={{ fontWeight: 600 }}>
        {title}
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
