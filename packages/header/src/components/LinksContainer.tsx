import { Box, Typography, IconButton } from "@material-ui/core"
import {
  Add,
  Info,
  ArrowDownward as Download,
  ExitToApp as Login,
} from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"
import type { Comp } from "@dictybase/functional"
import headerStyles from "../styles/headerStyles"

type IconType = typeof Login

type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

interface LinksContainerProperties {
  children: Comp
}

type IconButtonProperties = LinksContainerProperties & {
  href: string
}

const iconItems: Array<IconItemProperty> = [
  {
    href: "/community/citation",
    title: "Cite Us",
    Icon: Add,
    key: uuid4(),
  },
  {
    href: "/downloads",
    title: "Downloads",
    Icon: Download,
    key: uuid4(),
  },
  { href: "/about", title: "About dictybase", Icon: Info, key: uuid4() },
  { href: "/login", title: "Login", Icon: Login, key: uuid4() },
]

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

export {
  type IconItemProperty,
  iconItems,
  Title,
  LinksIcon,
  LinksIconButton,
  LinksContainer,
}
