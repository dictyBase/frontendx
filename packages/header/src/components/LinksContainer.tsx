import { Box, Typography, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ExitToApp as Login } from "@material-ui/icons"
import type { Comp } from "@dictybase/functional"

const useLinksStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    color: "hsl(210, 100%, 25%)",
  },
  icon: { fontSize: "2.2rem" },
})

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
  <Icon className={useLinksStyles().icon} />
)

const LinksIconButton = ({ children, href }: IconButtonProperties) => (
  <IconButton className={useLinksStyles().button} href={href}>
    {children}
  </IconButton>
)

const LinksContainer = ({ children }: LinksContainerProperties) => (
  <Box className={useLinksStyles().container}>{children}</Box>
)

export { Title, LinksIcon, LinksIconButton, LinksContainer }
