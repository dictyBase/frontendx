import "whatwg-fetch"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import { hydrateStore } from "dicty-components-redux"
import configureStore, { history } from "app/store/configureStore"
import App from "app/layout/App"
import registerServiceWorker from "./registerServiceWorker"

import "styles/style.css"
import "styles/style.js"

// load state from localStorage(if any) to set the initial state for the store
const initialState = hydrateStore({ key: "auth", namespace: "auth" })

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()
