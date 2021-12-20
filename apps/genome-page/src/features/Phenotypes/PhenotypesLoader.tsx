import { Skeleton } from "@mui/material"
import Box from "@material-ui/core/Box"

/**
 * Loading screen for Phenotypes page
 */
const PhenotypesLoader = () => (
  <Box mt={"10px"} data-testid="skeleton-loader">
    {[...Array(10)].map((i) => (
      <Skeleton key={i} animation="wave" />
    ))}
  </Box>
)

export default PhenotypesLoader
