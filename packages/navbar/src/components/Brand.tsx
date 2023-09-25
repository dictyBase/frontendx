// @flow
import { type FunctionComponent } from "react"
import { styled, withTheme } from "@material-ui/styles"
import { type Theme } from "@material-ui/core"

const Container = styled("div")({
  listStyleType: "none",
  display: "flex",
  padding: "10px",
  "@media (maxWidth: 768px)": {
    height: "30px",
  },
})
// eslint-disable-next-line jsx-a11y/anchor-has-content
const Link = styled(({ ...other }) => <a {...other} />)({
  display: "block",
  margin: "auto",
  textDecoration: "none",
  color: (properties: any) => properties.theme.text ?? "white",
  fontSize: "1.5em",

  "@media (max-width: 768px)": {
    top: 0,
    zIndex: 10,
  },
})

type BrandProperties = {
  /** Title of link */
  title: String
  /** Link URL */
  href: String
  /** Material-UI theme */
  theme: Object
}

/**
 * Brand creates a "brand" item in the navbar.
 */

const Brand = ({ title, href, theme }: BrandProperties) => (
  <Container>
    <Link theme={theme} href={href}>
      {title}
    </Link>
  </Container>
)

const themedBrand = withTheme<Theme, FunctionComponent<BrandProperties>>(Brand)

export { themedBrand as Brand }
