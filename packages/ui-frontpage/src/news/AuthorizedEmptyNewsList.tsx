import { Grid, Button } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import { useNavigate } from "react-router-dom"

const AuthorizedEmptyNewsList = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("news/create")
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}>
      <Grid item>
        <Button
          color="primary"
          size="large"
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={handleClick}>
          Write the first news item
        </Button>
      </Grid>
    </Grid>
  )
}

export { AuthorizedEmptyNewsList }
