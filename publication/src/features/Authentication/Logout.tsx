import React from "react"
import { Redirect } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { useAuthStore, ActionType } from "features/Authentication/AuthStore"
import { LOGOUT } from "common/graphql/mutation"

/**
 * Allows the user to logout
 */

const Logout = () => {
  const [{ token }, dispatch] = useAuthStore()
  const [logout] = useMutation(LOGOUT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  React.useEffect(() => {
    logout()
    dispatch({
      type: ActionType.LOGOUT,
    })
  }, [dispatch, logout])

  return <Redirect to="/" />
}

export default Logout
