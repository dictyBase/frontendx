import { LogtoProvider, LogtoConfig } from "@logto/react"
import { RouterProvider } from "react-router-dom"
import { CssBaseline } from "@material-ui/core"
import { AppProviders } from "./AppProviders"
import { frontpageRouter } from "../routes/routes"

const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
  scopes: ["openid", "profile", "email", "phone", "roles"],
}

const App = () => (
  <AppProviders>
    <LogtoProvider config={logtoConfig}>
      <CssBaseline />
      <RouterProvider router={frontpageRouter} />
    </LogtoProvider>
  </AppProviders>
)

export { App }
