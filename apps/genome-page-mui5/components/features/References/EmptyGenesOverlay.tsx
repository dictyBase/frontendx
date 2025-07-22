import { makeStyles, Grid, Box, Paper } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  message: {
    padding: "3rem",
    color: blueGrey[600],
    fontWeight: 600,
  },
})

const EmptyGenesOverlay = () => {
  const classes = useStyles()
  return (
    <Box data-testid="empty-genes-overlay" className={classes.container}>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        className={classes.grid}>
        <Grid item>
          <Paper className={classes.message}>No Matching Genes</Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export { EmptyGenesOverlay }
