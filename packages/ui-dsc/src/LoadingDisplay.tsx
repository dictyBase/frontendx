import { Skeleton } from "@material-ui/lab"
import { Box } from "@material-ui/core"

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
  rows = 6,
  height = 35,
}: LoadingDisplayProperties): JSX.Element => (
  <Box mx={8} mt={4}>
    {[...Array(rows)].map((_, i: number) => (
      <Skeleton key={i} height={height} />
    ))}
  </Box>
)
