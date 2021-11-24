import "common/utils/polyfills" // necessary for IE11
import React from "react"
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import App from "app/layout/App"
import AppProviders from "app/layout/AppProviders"
import { AuthProvider } from "features/Authentication/AuthStore"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"

console.log(process.env.REACT_APP_MOCK_SERVER)

if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_MOCK_SERVER === "on"
) {
  console.log("Mock server running...")
  const { worker } = require("./mocks/browser")
  worker.start()
}

ReactDOM.render(
  <AuthProvider>
    <AppProviders>
      <CssBaseline />
      <App />
    </AppProviders>
  </AuthProvider>,
  document.getElementById("root"),
)
