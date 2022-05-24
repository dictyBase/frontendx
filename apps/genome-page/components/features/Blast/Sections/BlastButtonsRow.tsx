import useStyles from "styles/geneOrIDSection"
import { Card, Button, Grid } from "@material-ui/core"

const BlastButtonsRow = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} justifyContent="flex-start">
      <Card variant="outlined" className={classes.card}>
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
}

export default BlastButtonsRow
