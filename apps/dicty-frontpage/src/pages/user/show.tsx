import { useEffect, useState } from "react"
import { useLogto } from "@logto/react"
import { match, P } from "ts-pattern"
import {
  UserWithRoles,
  ACCESS,
  displayOnAuthorized,
  matchEntries,
} from "@dictybase/auth-mui5"
import { Box, Grid, Divider } from "@mui/material"
import { Avatar, Information, EditablePagesList, Title, NoPages } from "ui-user"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"

type UserViewProperties = {
  user: UserWithRoles
}
const UserView = ({ user }: UserViewProperties) => (
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

const Show = () => {
  const { fetchUserInfo, isLoading } = useLogto()
  const [user, setUser] = useState<UserWithRoles>()

  useEffect(() => {
    const getUserInfo = async () => {
      setUser((await fetchUserInfo()) as UserWithRoles)
    }
    getUserInfo()
  }, [fetchUserInfo])

  return match({ user, isLoading })
    .with({ user: P.not(undefined) }, (input) => <UserView user={input.user} />)
    .with({ isLoading: true }, () => <FullPageLoadingDisplay />)
    .otherwise(() => <> This should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.protected
