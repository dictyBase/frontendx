import { useLocation } from "react-router-dom"
import { Box, Grid, Divider } from "@mui/material"
import {
  ACCESS,
  UserWithRoles,
  displayOnAuthorized,
  matchEntries,
} from "@dictybase/auth-mui5"
import { Avatar, Information, EditablePagesList, Title, NoPages } from "ui-user"

const Show = () => {
  const location = useLocation()
  const user = location.state as UserWithRoles
  return (
    <Box mt={4}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <Title />
        </Grid>
      </Grid>
      <Divider variant="inset" sx={{ border: "1px", height: "3px" }} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ marginTop: 2 }}>
        <Grid item xs={4} container direction="column" alignItems="center">
          <Avatar />
        </Grid>
        <Grid item xs={4} container direction="column" alignItems="flex-start">
          <Information user={user} />
        </Grid>
        <Grid item xs={4} container direction="column" alignItems="flex-start">
          {displayOnAuthorized({
            isAuthorized: matchEntries(user.roles, ["content-admin"]),
            authorized: <EditablePagesList />,
            unauthorized: <NoPages />,
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.protected
