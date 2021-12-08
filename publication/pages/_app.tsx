import type { AppProps } from "next/app"
import { AuthProvider } from "../src/features/Authentication/AuthStore"
import AppProviders from "../src/app/layout/AppProviders"
import CssBaseline from "@material-ui/core/CssBaseline"
import App from "../src/app/layout/App"

function PublicationApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App>
          <Component {...pageProps} />
        </App>
      </AppProviders>
    </AuthProvider>
  )
}

export default PublicationApp
