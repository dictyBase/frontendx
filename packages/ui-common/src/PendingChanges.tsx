import { Grid, Typography } from "@material-ui/core"
import LoopIcon from "@material-ui/icons/Loop"

const PendingChanges = () => (
  <Grid container direction="row" alignItems="center" spacing={1}>
    <Grid item>
      <LoopIcon />
    </Grid>
    <Grid item>
      <Typography> Saving... </Typography>
    </Grid>
  </Grid>
)

export { PendingChanges }
