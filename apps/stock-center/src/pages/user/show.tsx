import { useLocation } from "react-router-dom"
import { Box, Grid, Typography, Divider } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { ACCESS, UserWithRoles } from "auth"
import { Avatar, Information } from "ui-user"

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
  const classes = useStyles()
  const location = useLocation()
  const user = location.state as UserWithRoles
  return (
    <Box mt={4}>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography variant="h1" gutterBottom>
          DCR user profile
        </Typography>
      </Box>
      <Divider variant="inset" className={classes.divider} />
      <Grid container spacing={3} className={classes.userGrid}>
        <Grid item xs={4} container direction="row" justifyContent="flex-end">
          <Avatar />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          justifyContent="center"
          alignItems="baseline">
          <Information user={user} />
        </Grid>
      </Grid>
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.protected
