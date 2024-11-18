import { makeBy as AmakeBy } from "fp-ts/Array"
import { Skeleton } from "@material-ui/lab"
import Box from "@material-ui/core/Box"

/**
 * Loading screen for Phenotypes page
 */
const PhenotypesLoader = () => (
  <Box mt="10px" data-testid="skeleton-loader">
    {AmakeBy(12, (key) => (
      <Skeleton height={50} key={key} animation="wave" />
    ))}
  </Box>
)

export { PhenotypesLoader }
