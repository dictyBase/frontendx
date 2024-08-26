import { Grid, Button } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create'
import { makeStyles } from "@material-ui/core/styles"
import { useNavigate } from "react-router-dom"

const useDictyNewsStyles = makeStyles({
  list: {
    height: "100%",
  },
})

const AuthorizedEmptyNewsList = () => {
  const { list } = useDictyNewsStyles()
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
      className={list}>
      <Grid item >
        <Button color="primary" size="large" variant="outlined" startIcon={<CreateIcon />} onClick={handleClick}>
          Write the first news item
        </Button >
      </Grid>
    </Grid>
  )
}

export { AuthorizedEmptyNewsList }
