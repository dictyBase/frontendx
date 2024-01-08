import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { match } from "ts-pattern"
import { displayOnAuthorzied, useAuthorization } from "auth"
import { navTheme } from "../../common/utils/themes"
import authNavbarData from "../../common/data/authNavbarData.json"

const authorizedRoles = ["content-admin"]

const NavbarWithAuth = () => {
  const { isAuthorized, isLoading } = useAuthorization({
    entries: authorizedRoles,
  })

  return match(isLoading)
    .with(true, () => <></>)
    .with(false, () =>
      displayOnAuthorzied({
        isAuthorized,
        authorized: (
          <Navbar items={formatNavbarData(authNavbarData)} theme={navTheme} />
        ),
        unauthorized: <Navbar theme={navTheme} />,
      }),
    )
    .exhaustive()
}

export { NavbarWithAuth }
