import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import MuiLink from "@mui/material/Link"
import { Link } from "react-router-dom"
import { CatalogListItemActions } from "./CatalogListItemActions"
import { CatalogEntityLabel } from "./CatalogEntityLabel"
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
  action,
}: CatalogListItemBodyProperties) => {
  const path = toEntityPath(entity)

  return (
    <Grid container sx={{ py: 3, px: 5 }}>
      <Grid sm={8}>
        <CatalogEntityLabel title={title} entity={entity} id={id} />
        <Typography
          sx={{
            color: "text.secondary",
            my: 1.75,
            mb: 0.75,
            maxWidth: "85%",
          }}>
          {formatFormattedString(summary)}
        </Typography>
      </Grid>
      <Grid sm={4}>
        <CatalogListItemActions id={id} inStock={false} action={action} />
      </Grid>
    </Grid>
  )
}

export { CatalogListItemBody }
export type { CatalogListItemBodyProperties }
