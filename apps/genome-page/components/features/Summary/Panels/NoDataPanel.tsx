import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    color: grey[600],
  },
  grid: {
    minHeight: "10rem",
  },
  icon: {
    fontSize: "4rem",
  },
}))

type NoDataDisplayProperties = {
  query: string
  geneId: string
}

const NoDataPanel = ({ query, geneId }: NoDataDisplayProperties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Grid
        className={classes.grid}
        container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Grid item>
          <RemoveCircleOutlineIcon className={classes.icon} />
        </Grid>
        <Grid item>
          <Typography variant="h2">{`No ${query} for ${geneId}`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { NoDataPanel }
