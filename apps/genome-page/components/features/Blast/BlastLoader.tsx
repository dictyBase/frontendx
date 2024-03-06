import { Skeleton } from "@mui/material"
import Box from "@material-ui/core/Box"

/**
 * Loading screen for Blast page
 */
const BlastLoader = () => (
  <Box mt="10px" data-testid="skeleton-loader">
    {[...new Array(10)].map((item, key) => (
      <Skeleton key={key} animation="wave" />
    ))}
  </Box>
)

export { BlastLoader }
