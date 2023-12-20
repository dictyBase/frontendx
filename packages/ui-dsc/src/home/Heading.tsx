import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useStyles } from "./homeStyles"

const Heading = () => {
  const classes = useStyles({})
  return (
    <Grid item className={classes.header}>
      <Typography variant="h1">Welcome to Dicty Stock Center (DSC)</Typography>
    </Grid>
  )
}

export { Heading }
