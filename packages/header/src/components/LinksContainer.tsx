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

/**
 * @typedef {Object} IconItemProperty
 * @property {string} href - Link to the page
 * @property {string} title - Title of the page
 * @property {string} key - Unique key for the page
 * @property {IconType} Icon - Icon for the page
 */
type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

/**
 * @typedef {Object} LinksContainerProperties
 * @property {Comp} children - Children components
 */
interface LinksContainerProperties {
  children: Comp
}

/**
 * @typedef {Object} IconButtonProperties
 * @property {string} href - Link to the page
 * @property {Comp} children - Children components
 */
type IconButtonProperties = LinksContainerProperties & {
  href: string
}

/**
 * @type {Array<IconItemProperty>}
 */
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

/**
 * @param {Object} props
 * @param {string} props.title - Title of the page
 * @returns {JSX.Element}
 */
const Title = ({ title }: { title: string }) => (
  <Typography variant="subtitle2">{title}</Typography>
)

/**
 * @param {Object} props
 * @param {IconType} props.Icon - Icon for the page
 * @returns {JSX.Element}
 */
const LinksIcon = ({ Icon }: { Icon: IconType }) => (
  <Icon className={headerStyles().linksIcon} />
)

/**
 * @param {IconButtonProperties} props
 * @returns {JSX.Element}
 */
const LinksIconButton = ({ children, href }: IconButtonProperties) => (
  <IconButton className={headerStyles().linksButton} href={href}>
    {children}
  </IconButton>
)

/**
 * @param {LinksContainerProperties} props
 * @returns {JSX.Element}
 */
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
