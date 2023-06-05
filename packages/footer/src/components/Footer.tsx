import { MuiThemeProvider } from "@material-ui/core"
import { muiTheme } from "@dictyBase/navbar/src/styles/customTheme"
import { FooterContainer } from "./FooterContainer"
import { FooterProperties } from "../types"

/**
 * Renders dictyBase footer. Example usage:
 * ```tsx
 * import { Footer, FooterLink } from "@dictyBase/footer"
 *
 * <Footer title="Dicty Community Resource">
 *  <FooterLink label="Foo" url="/foo" />
 *  ...
 *  <FooterLink label="Bar" url="/bar" />
 * </Footer>
 * ```
 */
export const Footer = ({ theme, children, ...rest }: FooterProperties) => {
  const customTheme = theme ? theme : muiTheme

  return (
    <MuiThemeProvider theme={customTheme}>
      <FooterContainer links={children} {...rest} />
    </MuiThemeProvider>
  )
}
