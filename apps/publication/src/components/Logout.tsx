import React from "react"
import { useApolloClient } from "@apollo/client"
import { useLogoutMutation } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { Box, Typography } from "@material-ui/core"
import { useAuthStore, ActionType } from "./auth/AuthStore"

/**
 * Logout handles the user logout process.
 */
const Logout = () => {
  const client = useApolloClient()
  const {
    state: { token },
    dispatch,
  } = useAuthStore()
  const [logout] = useLogoutMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const router = useRouter()

  React.useEffect(() => {
    logout()
    dispatch({
      type: ActionType.LOGOUT,
    })
    client.resetStore()
    // redirect to home
    router.push("/")
  }, [dispatch, logout, client, router])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h1" align="center">
        Logging out...
      </Typography>
    </Box>
  )
}

export { Logout }
