import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { displayOnAuthorized, useAuthorization, authNavbarData } from "auth"
import { navTheme } from "../../common/utils/themes"

const authorizedRoles = ["content-admin"]

const NavbarWithAuth = () => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })

  return displayOnAuthorized({
    isAuthorized,
    authorized: (
      <Navbar items={formatNavbarData(authNavbarData)} theme={navTheme} />
    ),
    unauthorized: <Navbar theme={navTheme} />,
  })
}

export { NavbarWithAuth }
