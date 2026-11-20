import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { grey } from "@mui/material/colors"

type NoDataDisplayProperties = {
  query: string
  geneId: string
}

const NoDataPanel = ({ query, geneId }: NoDataDisplayProperties) => (
  <Paper sx={{ backgroundColor: "background.paper", color: grey[600] }}>
    <Grid
      sx={{ minHeight: "10rem" }}
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid item>
        <RemoveCircleOutlineIcon sx={{ fontSize: "4rem" }} />
      </Grid>
      <Grid item>
        <Typography variant="h2">{`No ${query} for ${geneId}`}</Typography>
      </Grid>
    </Grid>
  </Paper>
)

export { NoDataPanel }
