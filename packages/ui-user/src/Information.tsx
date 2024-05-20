import { Typography, Button, Paper } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { UserWithRoles } from "@dictybase/auth"
import { useNavigate } from "react-router-dom"

type InformationProperties = {
  user: UserWithRoles
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))

const Information = ({ user }: InformationProperties) => {
  const navigate = useNavigate()
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h2" gutterBottom>
        {user?.name}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {user?.email}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {user?.phone_number}
      </Typography>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => navigate("/user/edit", { state: user })}>
        Edit
      </Button>
    </Paper>
  )
}

export { Information }
