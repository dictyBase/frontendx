import "./common/utils/polyfills" // necessary for IE11
import "whatwg-fetch"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { hydrateStore } from "dicty-components-redux"
import CssBaseline from "@material-ui/core/CssBaseline"

import configureStore from "./app/store/configureStore"
import history from "./common/utils/routerHistory"
import App from "./app/layout/App"
import "typeface-roboto"
import * as serviceWorker from "./serviceWorker"

declare var process: {
  env: {
    REACT_APP_GA_TRACKING_ID: string
    NODE_ENV: string
  }
}

// load state from localStorage(if any) to set the initial state for the store
const initialState = hydrateStore({ key: "auth", namespace: "auth" })

const store = configureStore(initialState)

const setGoogleAnalytics = async () => {
  try {
    const module = await import("react-ga")
    let ReactGA = module.default
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  } catch (e) {
    console.error("could not load react-ga module", JSON.stringify(e))
  }
}

if (process.env.NODE_ENV === "production") {
  history.listen((location, action) => {
    setGoogleAnalytics()
  })
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CssBaseline />
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
