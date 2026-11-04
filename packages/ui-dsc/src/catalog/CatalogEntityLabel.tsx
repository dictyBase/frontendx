import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import MuiLink from "@mui/material/Link"
import { Link } from "react-router-dom"
import { getEntityPresentation } from "./catalogEntityPresentation"
import { toEntityPath, type CatalogEntityType } from "./catalogListItemData"
import { formatFormattedString } from "../utils/formatFormattedString"

type CatalogEntityLabelProperties = {
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
  /** Primary display title: the strain label or the plasmid name. */
  title: string
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
  const path = toEntityPath(entity)

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
      <MuiLink
        component={Link}
        to={`/${path}/${id}`}
        sx={{
          display: "inline-block",
          color: "text.secondary",
          fontWeight: 500,
          fontSize: "1.1rem",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}>
        {formatFormattedString(title)}
      </MuiLink>
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
