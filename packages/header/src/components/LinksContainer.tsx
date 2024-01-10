import { Box, Typography, IconButton } from "@material-ui/core"
import { ExitToApp as Login } from "@material-ui/icons"
import type { Comp } from "@dictybase/functional"
import { headerStyles } from "../styles/headerStyles"

type IconType = typeof Login

interface LinksContainerProperties {
  children: Comp
}

type IconButtonProperties = LinksContainerProperties & {
  href: string
}

const Title = ({ title }: { title: string }) => (
  <Typography variant="subtitle2">{title}</Typography>
)

const LinksIcon = ({ Icon }: { Icon: IconType }) => (
  <Icon className={headerStyles().linksIcon} />
)

const LinksIconButton = ({ children, href }: IconButtonProperties) => (
  <IconButton className={headerStyles().linksButton} href={href}>
    {children}
  </IconButton>
)

const LinksContainer = ({ children }: LinksContainerProperties) => (
  <Box className={headerStyles().linksContainer}>{children}</Box>
)

export { Title, LinksIcon, LinksIconButton, LinksContainer }
