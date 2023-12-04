import "common/utils/icons" // fontawesome library
import "fontsource-roboto"
import CssBaseline from "@material-ui/core/CssBaseline"
import type { AppProps } from "next/app"
import Head from "next/head"
import { AuthProvider } from "components/features/Authentication/AuthStore"
import AppProviders from "components/layout/AppProviders"
import App from "components/layout/App"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

const GenomePageApp = ({ Component, pageProps }: AppProps) => {
  useGoogleAnalytics()
  // Activate MSW
  // Utilizing this approach: https://github.com/vercel/next.js/tree/canary/examples/with-msw
  if (process.env.NEXT_PUBLIC_MOCK_SERVER === "on") {
    require("../mocks")
  }

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
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>dictyBase Genomepage</title>
          </Head>
          <Component {...pageProps} />
        </App>
      </AppProviders>
    </AuthProvider>
  )
}

export default GenomePageApp
