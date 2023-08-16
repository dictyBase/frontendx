// @flow
import { FunctionComponent } from "react"
import { styled, withTheme } from "@material-ui/styles"
import { type Theme } from "@material-ui/core"

const ListItem = styled("li")({
  display: "flex",
  "@media (max-width: 768px)": {
    width: "100%",
  },
})
// eslint-disable-next-line jsx-a11y/anchor-has-content
const Anchor = styled(({ ...other }) => <a {...other} />)({
  display: "block",
  color: (properties: any) => properties.theme.text ?? "white",
  textDecoration: "none",
  margin: "auto",
  padding: "10px",
  height: "100%",
  "@media (max-width: 768px)": {
    width: "100%",
  },
})

type LinkProperties = {
  /** Link title */
  title: String
  /** Link URL */
  href: String
  /** Material-UI theme */
  theme: Object
}

/**
 * Link is used for menu items without dropdowns.
 */

const Link = ({ title, href, theme }: LinkProperties) => (
  <ListItem>
    <Anchor href={href} alt={title} theme={theme}>
      {title}
    </Anchor>
  </ListItem>
)

const themedLink = withTheme<Theme, FunctionComponent<LinkProperties>>(Link)

export { themedLink as Link }
