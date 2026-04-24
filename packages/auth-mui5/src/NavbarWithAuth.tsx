import { Navbar, formatNavbarData } from "@dictybase/navbar-mui5"
import { createTheme, type Theme } from "@mui/material"
import { displayOnAuthorized } from "./functional/auth"
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

type NavbarWithAuthProperties = {
  frontPageUrl: string
  stockCenterUrl: string
  theme?: Theme
}

const NavbarWithAuth = ({
  frontPageUrl,
  stockCenterUrl,
  theme = defaultTheme,
}: NavbarWithAuthProperties) => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })

  const authNavbarItems = createAuthNavbarItems(frontPageUrl, stockCenterUrl)

  return displayOnAuthorized({
    isAuthorized,
    authorized: (
      <Navbar
        frontPageUrl={frontPageUrl}
        stockCenterUrl={stockCenterUrl}
        items={formatNavbarData(authNavbarItems)}
        theme={theme}
      />
    ),
    unauthorized: (
      <Navbar
        frontPageUrl={frontPageUrl}
        stockCenterUrl={stockCenterUrl}
        theme={theme}
      />
    ),
  })
}

export { NavbarWithAuth }
