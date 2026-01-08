import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import { useNavigate } from "react-router-dom"
import { useStyles } from "./homeStyles"

const AuthorizedHeading = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/information/intro/edit")
  }
  const { classes } = useStyles({})
  return (
    <Grid item className={classes.header}>
      <Typography variant="h1">
        Welcome to Dicty Stock Center (DSC)
        <IconButton
          aria-label="Edit DSC Intro"
          size="medium"
          onClick={onClick}
          className={classes.iconButton}>
          <EditIcon className={classes.icon} />
        </IconButton>
      </Typography>
    </Grid>
  )
}

export { AuthorizedHeading }
