import { Grid, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CreateIcon from "@mui/icons-material/Create"
import AnnouncementIcon from "@mui/icons-material/Announcement"

const AuthorizedDictyNewsTitle = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Grid container justifyContent="space-between" spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h1">DCR News</Typography>
          </Grid>
          <Grid item>
            <AnnouncementIcon sx={{ display: "block" }} />
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
