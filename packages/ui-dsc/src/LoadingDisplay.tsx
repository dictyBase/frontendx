import { Skeleton } from "@material-ui/lab"
import { Box } from "@material-ui/core"

/**
 * The prop for {@link LoadingDisplay}
 */
export interface LoadingDisplayProps {
  /** Number of rows of loading skeleton*/
  rows?: number
  /** Height of each loading skeleton*/
  height?: number
}

/**
 * Displays loading skeleton
 */
export function LoadingDisplay({
  rows = 6,
  height = 35,
}: LoadingDisplayProps): JSX.Element {
  return (
    <Box mx={8} mt={4}>
      {[...Array(rows)].map((_, i: number) => {
        return <Skeleton key={i} height={height} />
      })}
    </Box>
  )
}
