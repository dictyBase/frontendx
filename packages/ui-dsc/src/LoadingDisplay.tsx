import { makeBy as AmakeBy } from "fp-ts/Array"
import { Skeleton, Box } from "@mui/material"

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
  <Box mx={8}>
    {AmakeBy(rows, (n) => (
      <Skeleton
        data-testid="mui-skeleton"
        animation="wave"
        key={n}
        height={height}
      />
    ))}
  </Box>
)
