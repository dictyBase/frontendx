import { Grid, Typography } from "@mui/material"
import AnnouncementIcon from "@mui/icons-material/Announcement"

const DictyNewsTitle = () => (
  <Grid container spacing={1} alignItems="center">
    <Grid item>
      <Typography variant="h1">DCR News</Typography>
    </Grid>
    <Grid item>
      <AnnouncementIcon sx={{ display: "block" }} />
    </Grid>
  </Grid>
)

export { DictyNewsTitle }
