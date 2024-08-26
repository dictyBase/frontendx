import { Typography, Grid, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import grey from '@material-ui/core/colors/grey'

const useNewsLoaderStyles = makeStyles({
  list: {
    height: "100%",
    color: grey[500],
  },
  text: {
    fontSize: "24px"
  },
})

const NewsLoader = () => {
  const { list, text } = useNewsLoaderStyles()
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={list}>
      <Grid item >
        <CircularProgress />
      </Grid>
        <Typography className={text}>
          Loading News...
        </Typography>
    </Grid>
  )
}

export { NewsLoader }
