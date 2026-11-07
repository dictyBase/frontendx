import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { formatFormattedString } from "../utils/formatFormattedString"

type CatalogListItemBodyProperties = {
  /** Stock summary/description. */
  summary: string
}

/**
 * Renders the body of a {@link CatalogListItem}: its formatted summary.
 *
 * @param summary - The stock summary/description.
 */
const CatalogListItemBody = ({ summary }: CatalogListItemBodyProperties) => (
  <Box sx={{ py: 3, px: 5 }}>
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

export { CatalogListItemBody }
export type { CatalogListItemBodyProperties }
