import { useLogto } from "@logto/react"
import { useState, useEffect } from "react"
import { matchEntries } from "./functional"
import { type UserWithRoles } from "./const"

type useAuthorizationProperties = { entries: Array<string> }

/**
 * A custom hook that checks the authorization of a user based on their roles.
 *
 */
const useAuthorization = ({ entries }: useAuthorizationProperties) => {
  // Fetch the user information using the useLogto hook
  const { fetchUserInfo, isAuthenticated, isLoading } = useLogto()

  // Initialize state variables
  const [isAuthorized, setAuthorization] = useState<boolean>(false)
  // const [isLoading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserWithRoles>()
  useEffect(() => {
    // Function to check user authorization
    const authCheck = async (records: Array<string>) => {
      if (!isAuthenticated) {
        return
      }
      // Fetch the user information and cast it to UserWithRoles type
      const authUser = (await fetchUserInfo()) as UserWithRoles
      if (authUser) {
        // Set the authorization based on matching the user's roles with the entries
        setAuthorization(matchEntries(records, authUser.roles))
        setUser(authUser)
      }
    }
    // Perform the authorization check when the entries array changes
    authCheck(entries)
    // Only re-run the effect when the entries array changes
  }, [entries, fetchUserInfo, isAuthenticated])
  // Return the authorization status and loading state
  return { isAuthenticated, isAuthorized, isLoading, user }
}

export { useAuthorization }
