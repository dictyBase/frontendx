import { Typography, Paper } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))

const NoPages = () => {
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h2" gutterBottom>
        No editable pages for you
      </Typography>
    </Paper>
  )
}

export { NoPages }
