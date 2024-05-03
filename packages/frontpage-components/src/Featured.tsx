import { Grid, Typography, makeStyles, Theme } from "@material-ui/core"

const useFeaturedStyles = makeStyles({
  root: {
    backgroundColor: "#9eb5cb",
    color: "#0d2235",
    borderRadius: "10px",
    fontStyle: "italic",
  },
})

const Featured = () => {
  const { root } = useFeaturedStyles()
  return (
    <Grid
      container
      className={root}
      alignItems="center"
      justifyContent="center">
      <Grid item>
        <Typography variant="h2"> test </Typography>
      </Grid>
    </Grid>
  )
}

export { Featured }
