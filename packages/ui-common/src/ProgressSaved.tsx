import CloudDoneIcon from "@mui/icons-material/CloudDone"
import { Grid, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

const ProgressSaved = () => (
  <Grid alignItems="center" container spacing={1} wrap="nowrap">
    <Grid item>
      <Typography sx={{ color: green[800], fontWeight: 600 }}>Saved</Typography>
    </Grid>
    <Grid item>
      <CloudDoneIcon sx={{ color: green[900] }} />
    </Grid>
  </Grid>
)

export { ProgressSaved }
