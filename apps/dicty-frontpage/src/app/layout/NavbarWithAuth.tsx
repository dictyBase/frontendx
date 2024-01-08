import { Navbar, formatNavbarData } from "@dictybase/navbar"
import { match } from "ts-pattern"
import { displayOnAuthorzied, useAuthorization } from "auth"
import { Loader } from "../../common/components/Loader"
import { navTheme } from "../../common/utils/themes"
import authFooterData from "../../common/data/authNavbarData.json"

const NavbarWithAuth = () => {
  const { isAuthorized, isLoading } = useAuthorization({
    entries: ["content-admin"],
  })

  return match(isLoading)
    .with(true, () => <Loader />)
    .with(false, () =>
      displayOnAuthorzied({
        isAuthorized,
        authorized: (
          <Navbar items={formatNavbarData(authFooterData)} theme={navTheme} />
        ),
        unauthorized: <Navbar theme={navTheme} />,
      }),
    )
    .exhaustive()
}

export { NavbarWithAuth }
