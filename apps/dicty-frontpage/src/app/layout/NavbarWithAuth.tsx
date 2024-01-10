import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { match } from "ts-pattern"
import { displayOnAuthorized, useAuthorization, authNavbarData } from "auth"
import { Loader } from "../../common/components/Loader"
import { navTheme } from "../../common/utils/themes"

const authorizedRoles = ["content-admin"]

const NavbarWithAuth = () => {
  const { isAuthorized, isLoading } = useAuthorization({
    entries: authorizedRoles,
  })

  return match(isLoading)
    .with(true, () => <Loader />)
    .with(false, () =>
      displayOnAuthorized({
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
