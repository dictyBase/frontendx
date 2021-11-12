import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"

/**
 * Loader is the default loading skeleton component.
 */
const Loader = () => (
  <Grid
    container
    justifyContent="center"
    data-testid="skeleton-loader"
    role="loader">
    <Grid item xs={12}>
      <SkeletonTheme>
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={5} />
      </SkeletonTheme>
    </Grid>
  </Grid>
)

export default Loader
