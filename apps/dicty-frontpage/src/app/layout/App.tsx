import { LogtoProvider, LogtoConfig } from "@logto/react"
import { CssBaseline } from "@material-ui/core"
import { AppProviders } from "./AppProviders"
import { FrontPageApp } from "./FrontPageApp"

const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
  scopes: ["openid", "profile", "email", "phone", "roles"],
}

const App = () => (
  <AppProviders>
    <LogtoProvider config={logtoConfig}>
      <CssBaseline />
      <FrontPageApp />
    </LogtoProvider>
  </AppProviders>
)

export { App }
