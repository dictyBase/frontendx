import { Grid, Typography } from "@material-ui/core"
import { DynamicBreadCrumbs } from "./DynamicBreadCrumbs"

const NewsHeader = () => (
  <Grid container spacing={3} alignItems="center">
    <Grid item>
      <Typography gutterBottom align="center" variant="h1">
        Dicty News
      </Typography>
    </Grid>
    <Grid item>
      <DynamicBreadCrumbs />
    </Grid>
  </Grid>
)

export { NewsHeader }
