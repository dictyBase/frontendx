import { Header } from "@dictybase/header"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { append } from "fp-ts/Array"
import { Router as RemixRouter } from "@remix-run/router"
import { type UserWithRoles } from "./const"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { callbackPath, homePath } from "./const"
import { useAuthorization } from "./useAuthorization"
import { defaultHeaderLinks, authorizedHeaderLinks } from "./headerLinks"

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
// const conditonalHandler = (authCase: logtoHookProperties) =>
//   match(authCase)
//     .with(
//       P.when(({ isAuthenticated, user }) => isAuthenticated && user),
//       ({ user, clientRouter }) => (
//         <Header
//           LoginOut={
//             <LogoutButton
//               url={homePath}
//               user={user as UserWithRoles}
//               clientRouter={clientRouter}
//             />
//           }
//         />
//       ),
//     )
//     .otherwise(() => <Header LoginOut={<LoginButton url={callbackPath} />} />)
const conditonalHandler = (authCase: logtoHookProperties) =>
  match(authCase)
    .with(
      {
        isAuthorized: true,
        isAuthenticated: true,
        user: P.not(undefined),
      },
      ({ user, clientRouter }) =>
        pipe(
          authorizedHeaderLinks,
          append(
            <LogoutButton
              url={homePath}
              user={user as UserWithRoles}
              clientRouter={clientRouter}
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
      ({ user, clientRouter }) =>
        pipe(
          defaultHeaderLinks,
          append(
            <LogoutButton
              url={homePath}
              user={user as UserWithRoles}
              clientRouter={clientRouter}
            />,
          ),
        ),
    )
    .otherwise(() =>
      pipe(defaultHeaderLinks, append(<LoginButton url={callbackPath} />)),
    )

const authorizedRole = ["content-admin"]
/**
 * HeaderWithAuth is a React component that renders a header with authentication information.
 */
const HeaderWithAuth = ({ clientRouter }: HeaderWithAuthProperties) => {
  const { isLoading, isAuthenticated, isAuthorized, user } = useAuthorization({
    entries: authorizedRole,
  })
  const links = conditonalHandler({
    isLoading,
    isAuthenticated,
    isAuthorized,
    user,
    clientRouter,
  })
  return <Header links={links} />
}

export { HeaderWithAuth }
