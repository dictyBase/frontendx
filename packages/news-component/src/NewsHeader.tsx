import { Grid, Typography, Button } from "@material-ui/core"
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
      <Button>Create</Button>
    </Grid>
  </Grid>
)

export default NewsHeader
