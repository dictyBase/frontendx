import { Grid, Typography } from "@mui/material"
import NotInterestedIcon from "@mui/icons-material/NotInterested"
import { grey } from "@mui/material/colors"

const EmptyNewsList = () => (
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
      <NotInterestedIcon sx={{ fontSize: "50px" }} />
    </Grid>
    <Grid item>
      <Typography sx={{ fontSize: "24px" }}>
        There are currently no news items
      </Typography>
    </Grid>
  </Grid>
)

export { EmptyNewsList }
