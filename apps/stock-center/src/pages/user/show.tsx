import { useLocation } from "react-router-dom"
import { UserInfoResponse } from "@logto/react"
import { Box, Grid, Typography, IconButton, Divider } from "@material-ui/core"
import { MoodSharp } from "@material-ui/icons"
import { makeStyles, Theme } from "@material-ui/core/styles"

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
  const user = location.state as UserInfoResponse
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
          <IconButton size="medium">
            <MoodSharp style={{ fontSize: 70 }} />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          justifyContent="center"
          alignItems="baseline">
          <Typography variant="h2" gutterBottom>
            {user?.name}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {user?.email}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {user?.phone_number}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Show
