import "whatwg-fetch"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import configureStore from "app/store/configureStore"
import App from "app/layout/App"
import registerServiceWorker from "./registerServiceWorker"

import "styles/style.css"
import "styles/style.js"

const initialState = {}

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()
