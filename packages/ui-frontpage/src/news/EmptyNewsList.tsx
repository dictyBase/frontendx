import { Grid, Typography } from "@material-ui/core"
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { makeStyles } from "@material-ui/core/styles"
import grey from '@material-ui/core/colors/grey'

const useDictyNewsStyles = makeStyles({
  list: {
    height: "100%",
    color: grey[500],
  },
  icon: {
    fontSize: "50px"
  },
  text: {
    fontSize: "24px"
  },
})

const EmptyNewsList = () => {
  const { list, icon, text } = useDictyNewsStyles()
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={list}>
      <Grid item >
        <NotInterestedIcon className={icon} />
      </Grid>
      <Grid item>
        <Typography className={text}>
          There are currently no news items
        </Typography>
      </Grid>
    </Grid>
  )
}

export { EmptyNewsList }
