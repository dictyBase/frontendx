import { Paper, Grid } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import { WriteNewsButton } from "./WriteNewsButton"

const NewsListActionBar = () => (
  <Paper
    elevation={3}
    sx={{
      height: "100%",
      background: lightBlue[50],
    }}>
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      sx={{
        padding: 1,
        marginBottom: 2,
        top: 10,
        position: "sticky",
      }}
      data-testid="info-page-toolbar">
      <Grid item>
        <WriteNewsButton />
      </Grid>
    </Grid>
  </Paper>
)

export { NewsListActionBar }
