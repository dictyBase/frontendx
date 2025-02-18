import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import { useNavigate } from "react-router-dom"
import { useStyles } from "./homeStyles"

const AuthorizedHeading = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/information/intro/edit")
  }
  const classes = useStyles({})
  return (
    <Grid item className={classes.header}>
      <Typography variant="h1">
        Welcome to Dicty Stock Center (DSC)
        <IconButton aria-label="Edit DSC Intro" size="medium" onClick={onClick}>
          <EditIcon className={classes.icon} />
        </IconButton>
      </Typography>
    </Grid>
  )
}

export { AuthorizedHeading }
