import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { CssBaseline } from "@material-ui/core"
import { AppProviders } from "./AppProviders"
import { FrontPageApp } from "./FrontPageApp"

const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
  scopes: [
    UserScope.Profile,
    UserScope.Email,
    UserScope.Phone,
    UserScope.CustomData,
    UserScope.Identities,
    "write:content",
    "edit:content",
    "delete:content",
    "roles",
  ],
  resources: [
    import.meta.env.VITE_APP_LOGTO_API_FIRST_RESOURCE,
    import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
  ],
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
