import type { AppProps } from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import Head from "next/head"
import { AppProviders } from "../components/layout/AppProviders"
import { App } from "../components/layout/App"
import { AuthProvider } from "../components/auth/AuthStore"

const PublicationApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <AppProviders>
      <CssBaseline />
      <App>
        <Head>
          <link rel="shortcut icon" href="favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="manifest.json" />

          <title>dictyBase Literature</title>
        </Head>

        <Component {...pageProps} />
      </App>
    </AppProviders>
  </AuthProvider>
)

// eslint-disable-next-line import/no-default-export
export default PublicationApp
