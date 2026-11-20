import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import SearchIcon from "@mui/icons-material/Search"
import { blue, grey } from "@mui/material/colors"

const NoMatchDisplay = () => (
  <Grid
    sx={{
      minHeight: "15rem",
      backgroundColor: blue[50],
      color: grey[600],
    }}
    container
    direction="column"
    justifyContent="center"
    alignItems="center">
    <Grid item>
      <SearchIcon sx={{ fontSize: "4rem" }} />
    </Grid>
    <Grid item>
      <Typography variant="h2">No matches</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h4">
        Try searching again using different terms
      </Typography>
    </Grid>
  </Grid>
)

export { NoMatchDisplay }
