import type { AppProps } from "next/app"
import { AuthProvider } from "../src/features/Authentication/AuthStore"
import AppProviders from "../src/app/layout/AppProviders"
import CssBaseline from "@material-ui/core/CssBaseline"
import App from "../src/app/layout/App"
import Head from "next/head"

function PublicationApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App>
          <Head>
            <title>dictyBase Literature</title>
          </Head>

          <Component {...pageProps} />
        </App>
      </AppProviders>
    </AuthProvider>
  )
}

export default PublicationApp
