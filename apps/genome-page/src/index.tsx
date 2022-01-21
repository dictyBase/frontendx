import "common/utils/polyfills" // necessary for IE11
import React from "react"
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import App from "components/layout/App"
import AppProviders from "components/layout/AppProviders"
import { AuthProvider } from "features/Authentication/AuthStore"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"

const main = async () => {
  if (process.env.NODE_ENV === "development") {
    // Redirect to /gene
    if (window.location.pathname === "/") {
      window.location.pathname = "/gene/sadA"
    }

    // Activate MSW
    if (process.env.NEXT_PUBLIC_MOCK_SERVER === "on") {
      const { worker } = require("./mocks/browser.js")
      await worker.start({
        serviceWorker: {
          url: "/gene/mockServiceWorker.js",
        },
      })
    }
  }

  export default function NextIndexWrapper() {
    return (
      <AuthProvider>
        <AppProviders>
          <CssBaseline />
          <App />
        </AppProviders>
      </AuthProvider>
    )
  }
}

main()
