import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useDictyNewsStyles = makeStyles({
  emptyNewsList: {
    height: "100%",
  },
})

const EmptyNewsList = () => {
  const { emptyNewsList } = useDictyNewsStyles()
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      className={emptyNewsList}>
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h3">
              There are currently no news items
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { EmptyNewsList }
