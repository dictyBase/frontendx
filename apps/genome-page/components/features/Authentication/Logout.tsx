import React from "react"
import { useApolloClient } from "@apollo/client"
import Link from "next/link"
import { useLogoutMutation } from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "./AuthStore"

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

  React.useEffect(() => {
    // Empty token results in a 401, causing network errors
    if (!token || token === "") return

    logout()
    dispatch({
      type: ActionType.LOGOUT,
    })
    client.resetStore()
    // eslint-disable-next-line
  }, [dispatch, logout, client])

  return <Link href="/" />
}

export default Logout
