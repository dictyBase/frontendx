import { Grid, Typography } from "@material-ui/core"
import CloudDoneIcon from "@material-ui/icons/CloudDone"

const ProgressSaved = () => (
  <Grid container direction="row" alignItems="center" spacing={1}>
    <Grid item>
      <CloudDoneIcon />
    </Grid>
    <Grid item>
      <Typography> Saved </Typography>
    </Grid>
  </Grid>
)

export { ProgressSaved }
