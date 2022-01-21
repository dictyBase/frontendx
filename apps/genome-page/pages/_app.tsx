import "common/utils/icons" // fontawesome library
import "fontsource-roboto"
import { useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import type { AppProps } from "next/app"
import Head from "next/head"
import { AuthProvider } from "components/features/Authentication/AuthStore"
import AppProviders from "components/layout/AppProviders"
import App from "components/layout/App"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

const GenomePageApp = ({ Component, pageProps }: AppProps) => {
  useGoogleAnalytics()
  useEffect(() => {
    window.addEventListener("load", function () {
      if (process.env.NODE_ENV === "development") {
        // Redirect to /gene
        if (window.location.pathname === "/") {
          window.location.pathname = "/gene/sadA"
        }
        // Activate MSW
        if (process.env.NEXT_PUBLIC_MOCK_SERVER === "on") {
          const { worker } = require("../mocks/browser.js")
          worker.start({
            serviceWorker: {
              url: "/gene/mockServiceWorker.js",
            },
          })
        }
      }
    })
  }, [])

  return (
    <AuthProvider>
      <AppProviders>
        <CssBaseline />
        <App>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
            <title>dictyBase Genomepage</title>
          </Head>
        </App>
        <Component {...pageProps} />
      </AppProviders>
    </AuthProvider>
  )
}

export default GenomePageApp
