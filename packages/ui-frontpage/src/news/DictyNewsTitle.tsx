import { Grid, Typography } from "@material-ui/core"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import { makeStyles } from "@material-ui/core/styles"

const useDictyNewsStyles = makeStyles((theme) => ({
  newsIcon: {
    display: "block",
  },
}))

const DictyNewsTitle = () => {
  const { newsIcon } = useDictyNewsStyles()
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Typography variant="h1">Dicty News</Typography>
      </Grid>
      <Grid item>
        <AnnouncementIcon className={newsIcon} />
      </Grid>
    </Grid>
  )
}

export default DictyNewsTitle
