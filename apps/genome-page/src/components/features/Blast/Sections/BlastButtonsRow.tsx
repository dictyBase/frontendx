import { Card, Button, Grid } from "@mui/material"

const BlastButtonsRow = () => (
  <Grid item xs={12} justifyContent="flex-start">
    <Card
      variant="outlined"
      sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
      <Grid container>
        <Grid item xs={1}>
          <Button size="small" variant="contained">
            BLAST
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button size="small" variant="contained">
            Reset
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button size="small" variant="contained">
            BLAST at NCBI
          </Button>
        </Grid>
      </Grid>
    </Card>
  </Grid>
)

export { BlastButtonsRow }
