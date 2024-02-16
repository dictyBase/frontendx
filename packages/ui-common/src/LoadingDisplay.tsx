import { Skeleton } from "@material-ui/lab"
import { v4 as uuid } from "uuid"

/**
 * The prop for {@link LoadingDisplay}
 */
export interface LoadingDisplayProperties {
  /** Number of rows of loading skeleton */
  rows?: number
  /** Height of each loading skeleton */
  height?: number | string
}

/**
 * Displays loading skeleton
 */
export const LoadingDisplay = ({
  rows = 1,
  height = 35,
}: LoadingDisplayProperties): JSX.Element => (
  <>
    {new Array(rows).fill(0).map(() => (
      <Skeleton
        data-testid="skeleton"
        component="div"
        key={uuid()}
        height={height}
      />
    ))}
  </>
)
