/* eslint-disable react/no-array-index-key */
import Grid from "@material-ui/core/Grid"
import { Skeleton } from "@mui/material"

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
      {new Array(10).map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {new Array(10).map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {new Array(10).map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {new Array(5).map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
    </Grid>
  </Grid>
)

export { Loader }
