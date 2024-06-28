import { useNavigate } from "react-router-dom"
import { Grid, Theme, makeStyles, IconButton } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
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
    <Grid
      container
      justifyContent="space-between"
      className={toolbar}
      data-testid="info-page-toolbar">
      <Grid item>
        <IconButton onClick={handleClick}>
          <CreateIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export { NewsListActionBar }
