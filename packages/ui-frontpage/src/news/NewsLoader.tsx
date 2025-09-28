import { Typography, Grid, CircularProgress } from "@mui/material"
import { grey } from "@mui/material/colors"

const NewsLoader = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      height: "100%",
      color: grey[500],
    }}>
    <Grid item>
      <CircularProgress />
    </Grid>
    <Typography sx={{ fontSize: "24px" }}>Loading News...</Typography>
  </Grid>
)

export { NewsLoader }
