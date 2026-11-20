import { Grid, Box, Paper } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

const EmptyGenesOverlay = () => (
  <Box
    data-testid="empty-genes-overlay"
    sx={{ position: "absolute", width: "100%", height: "100%" }}>
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      sx={{ height: "100%" }}>
      <Grid item>
        <Paper
          sx={{
            padding: "3rem",
            color: blueGrey[600],
            fontWeight: 600,
          }}>
          No Matching Genes
        </Paper>
      </Grid>
    </Grid>
  </Box>
)

export { EmptyGenesOverlay }
