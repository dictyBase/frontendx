import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { displayOnAuthorized } from "./functional/auth"
import { useAuthorization } from "./useAuthorization"
import { createAuthNavbarItems } from "./data/authNavbarData"

const authorizedRoles = ["content-admin"]

type NavbarWithAuthProperties = {
  frontPageUrl: string
  stockCenterUrl: string
  theme?: Object
}

const NavbarWithAuth = ({
  frontPageUrl,
  stockCenterUrl,
  theme = {},
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
