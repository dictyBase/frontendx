import { Box } from "@material-ui/core"
import headerStyles from "../styles/headerStyles"
import Logo from "./Logo"
import Links from "./Links"
import Search from "./Search"
import { fromChildren, composeChildren, type Comp } from "@dictybase/functional"
import { pipe } from "fp-ts/function"
import { map as Omap, getOrElse } from "fp-ts/Option"

const boxWrapper = (children: Comp) => (
  <Box className={headerStyles().header}>{children}</Box>
)

const Header = () =>
  pipe(
    [<Logo />, <Search />, <Links />],
    fromChildren,
    composeChildren,
    Omap(boxWrapper),
    getOrElse(() => <></>),
  )

export default Header
