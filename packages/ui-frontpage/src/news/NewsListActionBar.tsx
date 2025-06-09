import { Paper, Grid, Theme, makeStyles } from "@material-ui/core"
import { blue, lightBlue } from "@material-ui/core/colors"
import { WriteNewsButton } from "./WriteNewsButton"

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    height: "100%",
    background: lightBlue[50],
  },
  grid: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    top: 10,
    position: "sticky",
  },
}))

const NewsListActionBar = () => {
  const { toolbar, grid } = useStyles()
  return (
    <Paper elevation={3} className={toolbar}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        className={grid}
        data-testid="info-page-toolbar">
        <Grid item>
          <WriteNewsButton />
        </Grid>
      </Grid>
    </Paper>
  )
}

export { NewsListActionBar }
