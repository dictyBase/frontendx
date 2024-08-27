import { Grid, Typography, Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import CreateIcon from "@material-ui/icons/Create"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import { makeStyles } from "@material-ui/core/styles"

const useDictyNewsStyles = makeStyles({
  newsIcon: {
    display: "block",
  },
})

const AuthorizedDictyNewsTitle = () => {
  const { newsIcon } = useDictyNewsStyles()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Grid container justifyContent="space-between" spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h1">Dicty News</Typography>
          </Grid>
          <Grid item>
            <AnnouncementIcon className={newsIcon} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<CreateIcon />}
          onClick={handleClick}>
          Write News Article
        </Button>
      </Grid>
    </Grid>
  )
}

export { AuthorizedDictyNewsTitle }
