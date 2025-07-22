import { FunctionComponent } from "react"
import {
  MuiThemeProvider as MuiThemeProviderMUI4,
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles"
import { ThemeProvider as MUI5ThemeProvider } from "@mui/material/styles"
import { dictyTheme as dictyThemeMUI4 } from "@dictybase/ui-common"
import { dictyTheme as dictyThemeMUI5 } from "@dictybase/ui-common-mui5"

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "dicty-mui-jss",
})

const ThemeProvider: FunctionComponent = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <MUI5ThemeProvider theme={dictyThemeMUI5}>
      <MuiThemeProviderMUI4 theme={dictyThemeMUI4}>
        {children}
      </MuiThemeProviderMUI4>
    </MUI5ThemeProvider>
  </StylesProvider>
)

export { ThemeProvider }
