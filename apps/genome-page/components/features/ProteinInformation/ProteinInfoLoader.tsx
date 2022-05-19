import { createTheme } from "@material-ui/core/styles"
import { Box, Skeleton } from "@mui/material"

/**
 * Loading screen for Protein Information page
 */
const ProteinInfoLoader = () => (
  <Box data-testid="skeleton-loader">
    <Box mt="10px">
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
    </Box>
  </Box>
)

export default ProteinInfoLoader
