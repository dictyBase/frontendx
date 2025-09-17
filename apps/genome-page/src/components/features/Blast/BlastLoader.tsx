import { Skeleton } from "@mui/material"
import { pipe } from "fp-ts/function"
import { makeBy as AmakeBy } from "fp-ts/Array"
import Box from "@material-ui/core/Box"

/**
 * Loading screen for Blast page
 */
const BlastLoader = () => (
  <Box mt="10px" data-testid="skeleton-loader">
    {pipe(AmakeBy(10, (index) => <Skeleton key={index} animation="wave" />))}
  </Box>
)

export { BlastLoader }
