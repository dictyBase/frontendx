import { FunctionComponent } from "react"
import {
  ThemeProvider as ThemeProviderMUI5,
  createTheme as createThemeV5,
  ThemeOptions as ThemeOptionsMUI5,
} from "@mui/material/styles"
import {
  MuiThemeProvider as MuiThemeProviderMUI4,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles"
import { dictyTheme, dictyThemeOptions } from "@dictybase/ui-common"

const dictyThemeMUI5 = createThemeV5(dictyThemeOptions as ThemeOptionsMUI5)

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "dictybase",
})

const ThemeProvider: FunctionComponent = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProviderMUI5 theme={dictyThemeMUI5}>
      <MuiThemeProviderMUI4 theme={dictyTheme}>{children}</MuiThemeProviderMUI4>
    </ThemeProviderMUI5>
  </StylesProvider>
)

export { ThemeProvider }
