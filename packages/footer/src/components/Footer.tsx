import { MuiThemeProvider } from "@material-ui/core"
import { FooterProps } from "footer/src/types"
import { muiTheme } from "navbar/src/styles/customTheme"
import { FooterContainer } from "footer/src/components/FooterContainer"

/**
 * Renders dictyBase footer, example usage:
 * ```ts
 * import { Footer, FooterLink } from "footer"
 * 
 * <Footer title="Dicty Community Resource">
 *  <FooterLink label="Foo" url="/foo" />
 *  ...
 *  <FooterLink label="Bar" url="/bar" />
 * </Footer>
 * ```
 */
export const Footer = ({ theme, children, ...rest }: FooterProps) => {
  const customTheme = theme ? theme : muiTheme

  return (
    <MuiThemeProvider theme={customTheme}>
      <FooterContainer links={children} {...rest} />
    </MuiThemeProvider>
  )
}
