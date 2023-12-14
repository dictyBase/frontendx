import { Header } from "@dictybase/header"
import { match, P } from "ts-pattern"
import { useLogto } from "@logto/react"
import { useState, useEffect } from "react"
import { Router as RemixRouter } from "@remix-run/router"
import { type UserWithRoles } from "./const"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { callbackPath, homePath } from "./const"

/**
 * @description Represents the properties required for the HeaderWithAuth component.
 * @typedef {object} HeaderWithAuthProperties
 * @property {RemixRouter} clientRouter - The client router instance used for navigation.
 */
type HeaderWithAuthProperties = {
  clientRouter: RemixRouter
}

/**
 * Represents the properties for the `logtoHook` function in the `HeaderWithAuth.tsx` file.
 * @typedef {Object} logtoHookProperties
 * @property {HeaderWithAuthProperties} - The properties inherited from the `HeaderWithAuthProperties` type.
 * @property {Error | undefined} [error] - An optional error object.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {boolean} isLoading - Indicates whether the page is currently loading.
 * @property {UserWithRoles | undefined} [user] - An optional object representing a user with roles.
 */
type logtoHookProperties = HeaderWithAuthProperties & {
  error: Error | undefined
  isAuthenticated: boolean
  isLoading: boolean
  user: UserWithRoles | undefined
}

/**
 * This function takes in a logtoHookProperties object and returns a JSX element representing a Header component with a login/logout button.
 * If the user is authenticated and exists, it renders a Header component with a LogoutButton component.
 * If the user is not authenticated or does not exist, it renders a Header component with a LoginButton component.
 *
 */
const conditonalHandler = (logtoCase: logtoHookProperties) =>
  match(logtoCase)
    .with(
      P.when(({ isAuthenticated, user }) => isAuthenticated && user),
      ({ user, clientRouter }) => (
        <Header
          LoginOut={
            <LogoutButton
              url={homePath}
              user={user as UserWithRoles}
              clientRouter={clientRouter}
            />
          }
        />
      ),
    )
    .otherwise(() => <Header LoginOut={<LoginButton url={callbackPath} />} />)

/**
 * HeaderWithAuth is a React component that renders a header with authentication information.
 */
const HeaderWithAuth = ({ clientRouter }: HeaderWithAuthProperties) => {
  // Destructure properties from the useLogto() hook
  const { isAuthenticated, isLoading, error, fetchUserInfo, getAccessToken } =
    useLogto()

  // Define state for the authenticated user
  const [user, setAuthUser] = useState<UserWithRoles>()

  // Fetch user information upon component mount or when dependencies change
  useEffect(() => {
    const handleUserInformation = async () => {
      if (isAuthenticated) {
        // Fetch user info and cast result to UserWithRoles type
        const authUser = (await fetchUserInfo()) as UserWithRoles
        setAuthUser(authUser)
      }
    }

    // Call the handleUserInformation function
    handleUserInformation()
  }, [fetchUserInfo, isAuthenticated, getAccessToken])

  // Return the result of the conditonalHandler function
  return conditonalHandler({
    isAuthenticated,
    isLoading,
    error,
    user,
    clientRouter,
  })
}

export { HeaderWithAuth }
