import { Box, Typography, IconButton } from "@mui/material"
import { ExitToApp as Login } from "@mui/icons-material"
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
  <Icon className={headerStyles().classes.linksIcon} />
)

const LinksIconButton = ({ children, href }: IconButtonProperties) => (
  <IconButton className={headerStyles().classes.linksButton} href={href} size="large">
    {children}
  </IconButton>
)

const LinksContainer = ({ children }: LinksContainerProperties) => (
  <Box className={headerStyles().classes.linksContainer}>{children}</Box>
)

export { Title, LinksIcon, LinksIconButton, LinksContainer }
