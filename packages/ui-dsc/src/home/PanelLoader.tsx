import Grid from "@material-ui/core/Grid"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

type PanelLoaderProperties = {
  /** Number of lines to show in skeleton */
  skeletonCount: number
}

/**
 * PanelLoader is a loading skeleton displayed when homepage
 * panels are loading with GraphQL data.
 */

const PanelLoader = ({ skeletonCount }: PanelLoaderProperties) => (
  <Grid container justifyContent="center" data-testid="panel-loader">
    <Grid item xs={12}>
      <SkeletonTheme baseColor="#D3D3D3" highlightColor="#DCDCDC">
        <Skeleton count={skeletonCount} />
        &nbsp;
      </SkeletonTheme>
    </Grid>
  </Grid>
)

export { PanelLoader }
