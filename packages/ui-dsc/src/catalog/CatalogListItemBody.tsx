import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import MuiLink from "@mui/material/Link"
import { Link } from "react-router-dom"
import { toEntityPath, type CatalogEntityType } from "./catalogListItemData"
import { formatFormattedString } from "../utils/formatFormattedString"

type CatalogListItemBodyProperties = {
  /** Stock id, used to build the link to the item's detail page. */
  id: string
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Primary display title: the strain label or the plasmid name. */
  title: string
  /** Stock summary/description. */
  summary: string
}

/**
 * Renders the body of a {@link CatalogListItem}: a link to the item's detail
 * page, its summary, and a large faded entity watermark clipped at the
 * card's edge.
 *
 * @param id - Stock id, used to build the link to the item's detail page.
 * @param entity - Whether the item is a strain or a plasmid.
 * @param title - The strain label or plasmid name.
 * @param summary - The stock summary/description.
 */
const CatalogListItemBody = ({
  id,
  entity,
  title,
  summary,
}: CatalogListItemBodyProperties) => {
  const path = toEntityPath(entity)

  return (
    <Box sx={{ py: 3, px: 5 }}>
      {/*
      <Icon
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          right: -32,
          transform: "translateY(-50%)",
          fontSize: 150,
          color: alpha(color, 0.06),
        }}
      />
      */}
      {/*
      <MuiLink
        component={Link}
        to={`/${path}/${id}`}
        sx={{
          display: "inline-block",
          color: "text.primary",
          fontWeight: 500,
          fontSize: "1.1rem",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}>
        {formatFormattedString(title)}
      </MuiLink>
      */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          my: 1.75,
          mb: 0.75,
        }}>
        {formatFormattedString(summary)}
      </Typography>
    </Box>
  )
}

export { CatalogListItemBody }
export type { CatalogListItemBodyProperties }
