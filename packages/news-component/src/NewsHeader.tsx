import { Grid, Typography, IconButton } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"
import useNewsHeaderStyles from "./useNewsHeaderStyles"

const NewsHeader = () => {
  const { root } = useNewsHeaderStyles()

  return (
    <Grid container className={root}>
      <Grid item>
        <Typography variant="h1">News</Typography>
      </Grid>
      <Grid item>
        <IconButton>
          <CreateIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default NewsHeader
