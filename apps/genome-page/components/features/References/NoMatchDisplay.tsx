import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"
import { blue, grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  grid: {
    minHeight: "15rem",
    backgroundColor: blue[50],
    color: grey[600],
  },
  icon: {
    fontSize: "4rem",
  },
})

const NoMatchDisplay = () => {
  const classes = useStyles()
  return (
    <Grid
      className={classes.grid}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <SearchIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="h2">{`No matches`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">Try searching again using different terms</Typography>
      </Grid>
    </Grid>
  )
}

export { NoMatchDisplay }
