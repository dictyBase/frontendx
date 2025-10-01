import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

type CatalogHeaderProperties = {
  /** Title of catalog page */
  title: "Strain Catalog" | "Plasmid Catalog"
}

/**
 * CatalogHeader is the header at the top of every stock catalog page.
 */

const CatalogHeader = ({ title }: CatalogHeaderProperties) => (
  <Box textAlign="center" p={1}>
    <Typography
      variant="h1"
      sx={{
        marginBottom: 3,
      }}>
      {title}
    </Typography>
  </Box>
)

export { CatalogHeader }
