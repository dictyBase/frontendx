import { Grid, Theme, makeStyles, Button } from "@material-ui/core"
import { WriteNewsButton } from "@dictybase/ui-frontpage"

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    top: 20,
    position: "sticky",
  },
}))

const NewsListActionBar = () => {
  const { toolbar } = useStyles()
  return (
    <Grid container direction="column" className={toolbar} data-testid="info-page-toolbar">
      <Grid item>
        <WriteNewsButton />
      </Grid>
    </Grid>
  )
}

export { NewsListActionBar }
