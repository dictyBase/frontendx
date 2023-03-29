import { Box } from "@material-ui/core"
import headerStyles from "../styles/headerStyles"
import Logo from "./Logo"
import Links from "./Links"
import Search from "./Search"
import { fromChildren, composeChildren, type Comp } from "@dictybase/functional"
import { pipe } from "fp-ts/function"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { v4 as uuid4 } from "uuid"

const boxWrapper = (children: Comp) => (
  <Box className={headerStyles().header}>{children}</Box>
)

const Header = () =>
  pipe(
    [<Logo key={uuid4()} />, <Search key={uuid4()} />, <Links key={uuid4()} />],
    fromChildren,
    composeChildren,
    Omap(boxWrapper),
    getOrElse(() => <></>),
  )

export default Header
