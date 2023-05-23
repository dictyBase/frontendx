import { Grid, Typography } from "@material-ui/core"
import CreateButton from "./CreateButton"
import DynamicBreadCrumbs from "./DynamicBreadCrumbs"

const NewsHeader = () => (
  <Grid container justifyContent="space-between">
    <Grid item>
      <DynamicBreadCrumbs />
    </Grid>
    <Grid item>
      <Typography gutterBottom align="center" variant="h1">
        Dicty News
      </Typography>
    </Grid>
    <Grid item>
      <CreateButton />
    </Grid>
  </Grid>
)

export default NewsHeader
