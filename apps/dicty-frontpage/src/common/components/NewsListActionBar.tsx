import { useNavigate } from "react-router-dom"
import { Grid, Theme, makeStyles, Button } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
    alignItems: "center",
  },
  label: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.8rem",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    whiteSpace: "nowrap",
    borderRadius: "0.25em",
    backgroundColor: theme.palette.primary.light,
  },
  icon: {
    color: theme.palette.primary.light,
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.primary.light,
  },
}))

const NewsListActionBar = () => {
  const { toolbar } = useStyles()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Grid container className={toolbar} data-testid="info-page-toolbar">
      <Grid item>
        <Button
          startIcon={<CreateIcon />}
          color="primary"
          variant="outlined"
          onClick={handleClick}>
          Write News Article
        </Button>
      </Grid>
    </Grid>
  )
}

export { NewsListActionBar }
