import {
  Container,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles({
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 35px 15px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
})

const EmptyNewsViewAuth = () => {
  const navigate = useNavigate()
  const { header } = useStyles()
  const onClick = () => {
    navigate("/news/create")
  }
  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item className={header}>
          <Typography variant="h1" align="center">
            Dicty Community Resource News
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">
            There are currently no news items.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<CreateIcon />}
            variant="outlined"
            color="primary"
            size="large"
            onClick={onClick}>
            Write News Article
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export { EmptyNewsViewAuth }
