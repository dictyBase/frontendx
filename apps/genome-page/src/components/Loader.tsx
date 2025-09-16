import { makeBy as AmakeBy } from "fp-ts/Array"
import { Skeleton } from "@material-ui/lab"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"

const useStyles = makeStyles({
  container: {
    backgroundColor: blue[50],
    padding: "1rem",
  },
})

/**
 * Loader is the default loading skeleton component.
 */
const Loader = ({ rows = 12 }: { rows?: number }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Box data-testid="skeleton-loader">
        {AmakeBy(rows, (key) => (
          <Skeleton height={50} key={key} animation="wave" />
        ))}
      </Box>
    </Paper>
  )
}

export { Loader }
