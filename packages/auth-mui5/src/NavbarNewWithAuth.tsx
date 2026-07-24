import { match, P } from "ts-pattern"
import { createTheme, type Theme } from "@mui/material"
import { NavbarNew, formatNavbarData } from "@dictybase/navbar-mui5"
import { type UserWithRoles, getCallbackPath, getHomePath } from "./const"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { AuthorizedLogoutButton } from "./AuthorizedLogoutButton"
import { useAuthorization } from "./useAuthorization"
import { createAuthNavbarItems } from "./data/authNavbarData"

const primaryColor = "#004080"
const blueSecondaryColor = "#001b53"

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: blueSecondaryColor,
    },
  },
})

const authorizedRoles = ["content-admin"]

type NavbarNewWithAuthProperties = {
  frontPageUrl: string
  stockCenterUrl: string
  basename: string
  theme?: Theme
}

const NavbarNewWithAuth = ({
  frontPageUrl,
  stockCenterUrl,
  basename,
  theme = defaultTheme,
}: NavbarNewWithAuthProperties) => {
  const { isLoading, isAuthenticated, isAuthorized, user } = useAuthorization({
    entries: authorizedRoles,
  })

  const items = isAuthorized
    ? formatNavbarData(createAuthNavbarItems(frontPageUrl, stockCenterUrl))
    : undefined

  const loginElement = match({ isLoading, isAuthenticated, isAuthorized, user })
    .with({ isLoading: true }, () => (
      <LoginButton url={getCallbackPath(basename)} />
    ))
    .with(
      {
        isAuthorized: true,
        isAuthenticated: true,
        user: P.not(undefined),
      },
      ({ user: currentUser }) => (
        <AuthorizedLogoutButton
          url={getHomePath(basename)}
          frontPageUrl={frontPageUrl}
          user={currentUser as UserWithRoles}
        />
      ),
    )
    .with(
      {
        isAuthorized: false,
        isAuthenticated: true,
        user: P.not(undefined),
      },
      ({ user: currentUser }) => (
        <LogoutButton
          url={getHomePath(basename)}
          frontPageUrl={frontPageUrl}
          user={currentUser as UserWithRoles}
        />
      ),
    )
    .otherwise(() => <LoginButton url={getCallbackPath(basename)} />)

  return (
    <NavbarNew
      frontPageUrl={frontPageUrl}
      stockCenterUrl={stockCenterUrl}
      {...(items && { items })}
      loginElement={loginElement}
      theme={theme}
    />
  )
}

export { NavbarNewWithAuth }
