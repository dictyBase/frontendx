import { Skeleton } from "@material-ui/lab"
import { Box } from "@material-ui/core"
import { v4 as uuid } from "uuid"

/**
 * The prop for {@link LoadingDisplay}
 */
export interface LoadingDisplayProperties {
  /** Number of rows of loading skeleton */
  rows?: number
  /** Height of each loading skeleton */
  height?: number
}

/**
 * Displays loading skeleton
 */
export const LoadingDisplay = ({
  rows = 1,
  height = 35,
}: LoadingDisplayProperties): JSX.Element => (
  <Box mx={8} mt={4}>
    {new Array(rows).fill(0).map(() => (
      <Skeleton data-testid="skeleton" key={uuid()} height={height} />
    ))}
  </Box>
)
