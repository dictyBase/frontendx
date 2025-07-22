import React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { dictyTheme } from "@dictybase/ui-common"

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={dictyTheme}>{children}</MuiThemeProvider>
)

export { ThemeProvider }
