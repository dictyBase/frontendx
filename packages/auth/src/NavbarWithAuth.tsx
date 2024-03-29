import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { displayOnAuthorized } from "./functional/auth"
import { useAuthorization } from "./useAuthorization"
import { authNavbarItems } from "./data/authNavbarData"

const authorizedRoles = ["content-admin"]

type NavbarWithAuthProperties = {
  theme?: Object
}

const NavbarWithAuth = ({ theme = {} }: NavbarWithAuthProperties) => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })

  return displayOnAuthorized({
    isAuthorized,
    authorized: (
      <Navbar items={formatNavbarData(authNavbarItems)} theme={theme} />
    ),
    unauthorized: <Navbar theme={theme} />,
  })
}

export { NavbarWithAuth }
