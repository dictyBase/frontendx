import React from "react"
import { ThemeProvider as ThemeProviderMUI5 } from "@mui/material/styles"
import {
  MuiThemeProvider as MuiThemeProviderMUI4,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles"
import { dictyThemeV4, dictyThemeV5 } from "@dictybase/ui-common"

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "dictybase",
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProviderMUI5 theme={dictyThemeV5}>
      <MuiThemeProviderMUI4 theme={dictyThemeV4}>
        {children}
      </MuiThemeProviderMUI4>
    </ThemeProviderMUI5>
  </StylesProvider>
)

export { ThemeProvider }
