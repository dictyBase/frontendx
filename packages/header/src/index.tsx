import { Box } from "@material-ui/core"
import headerStyles from "./styles/headerStyles"
import Logo from "./functional/Logo"
import Links from "./functional/Links"
import Search from "./functional/Search"

const Header = () => (
  <Box className={headerStyles().header}>
    <Logo />
    <Search />
    <Links />
  </Box>
)

export default Header
