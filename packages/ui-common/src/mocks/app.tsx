import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider as ThemeProviderMUI5 } from "@mui/material/styles"
import { MuiThemeProvider as ThemeProviderMUI4 } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { dictyThemeV4, dictyThemeV5 } from "../dictyTheme"
import { routes } from "./routeBuilder"

const router = createBrowserRouter(routes)

const App = () => (
  <ThemeProviderMUI5 theme={dictyThemeV5}>
    <ThemeProviderMUI4 theme={dictyThemeV4}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProviderMUI4>
  </ThemeProviderMUI5>
)

const main = async () => {
  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

main()
