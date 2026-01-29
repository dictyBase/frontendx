import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { FC, StrictMode } from "react"
import { render } from "react-dom"
import { ThemeProvider as ThemeProviderMUI5 } from "@mui/material/styles"
import {
  MuiThemeProvider as ThemeProviderMUI4,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { dictyThemeV4, dictyThemeV5 } from "../dictyTheme"
import { routes } from "./routeBuilder"

const router = createBrowserRouter(routes)

const App: FC = () => (
  <ThemeProviderMUI5 theme={dictyThemeV5}>
    <ThemeProviderMUI4 theme={dictyThemeV4}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProviderMUI4>
  </ThemeProviderMUI5>
)

const main = async () => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.querySelector("#root"),
  )
}

main()
