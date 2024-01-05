import { useLocation } from "react-router-dom"
import { Box, Grid, Typography, Divider } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { ACCESS, UserWithRoles, displayOnAuthorzied, matchEntries } from "auth"
import { Avatar, Information, EditablePagesList } from "ui-user"

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    border: "1px",
    height: "3px",
  },
  userGrid: {
    marginTop: theme.spacing(2),
  },
}))

const Show = () => {
  const location = useLocation()
  const user = location.state as UserWithRoles
  const classes = useStyles()
  return (
    <Box mt={4}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <Typography variant="h1" gutterBottom>
            DCR user profile
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="inset" className={classes.divider} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={1}
        className={classes.userGrid}>
        <Grid item xs={4} container direction="column" alignItems="center">
          <Avatar />
        </Grid>
        <Grid item xs={4} container direction="column" alignItems="flex-start">
          <Information user={user} />
        </Grid>
        <Grid item xs={4} container direction="column" alignItems="flex-start">
          {displayOnAuthorzied({
            isAuthorized: matchEntries(user.roles, ["content-admin"]),
            authorized: <EditablePagesList />,
            unauthorized: <b>Nothing to display</b>,
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.protected
