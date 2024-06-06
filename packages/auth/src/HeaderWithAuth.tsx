import { pipe } from "fp-ts/function"
import { append } from "fp-ts/Array"
import { match, P } from "ts-pattern"
import { Header } from "@dictybase/header"
import { type UserWithRoles, getCallbackPath, getHomePath } from "./const"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { useAuthorization } from "./useAuthorization"
import {
  createDefaultHeaderIcons,
  createAuthorizedHeaderIcons,
} from "./headerLinks"

/**
 * @description Represents the properties required for the HeaderWithAuth component.
 * @typedef {object} HeaderWithAuthProperties
 * @property {string} frontPageUrl - The url for the Front Page application.
 * @property {string} baseUrl - The base url for the application that is rendering the header.
 */
type HeaderWithAuthProperties = {
  frontPageUrl: string
  basename: string
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
  isAuthenticated: boolean
  isAuthorized: boolean
  isLoading: boolean
  user: UserWithRoles | undefined
}

/**
 * This function takes in a logtoHookProperties object and returns a JSX element representing a Header component with a login/logout button.
 * If the user is authenticated and exists, it renders a Header component with a LogoutButton component.
 * If the user is not authenticated or does not exist, it renders a Header component with a LoginButton component.
 *
 */
const conditonalHandler = (authCase: logtoHookProperties) =>
  match(authCase)
    .with(
      {
        isAuthorized: true,
        isAuthenticated: true,
        user: P.not(undefined),
      },
      ({ user, frontPageUrl, basename }) =>
        pipe(
          frontPageUrl,
          createAuthorizedHeaderIcons,
          append(
            <LogoutButton
              url={getHomePath(basename)}
              frontPageUrl={frontPageUrl}
              user={user as UserWithRoles}
            />,
          ),
        ),
    )
    .with(
      {
        isAuthorized: false,
        isAuthenticated: true,
        user: P.not(undefined),
      },
      ({ user, frontPageUrl, basename }) =>
        pipe(
          frontPageUrl,
          createDefaultHeaderIcons,
          append(
            <LogoutButton
              url={getHomePath(basename)}
              frontPageUrl={frontPageUrl}
              user={user as UserWithRoles}
            />,
          ),
        ),
    )
    .otherwise(({ frontPageUrl, basename }) =>
      pipe(
        frontPageUrl,
        createDefaultHeaderIcons,
        append(<LoginButton url={getCallbackPath(basename)} />),
      ),
    )

const authorizedRole = ["content-admin"]
/**
 * HeaderWithAuth is a React component that renders a header with authentication information.
 */
const HeaderWithAuth = ({
  frontPageUrl,
  basename,
}: HeaderWithAuthProperties) => {
  const { isLoading, isAuthenticated, isAuthorized, user } = useAuthorization({
    entries: authorizedRole,
  })
  const links = conditonalHandler({
    isLoading,
    isAuthenticated,
    isAuthorized,
    user,
    frontPageUrl,
    basename,
  })
  return <Header links={links} />
}

export { HeaderWithAuth }
