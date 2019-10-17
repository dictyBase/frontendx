import "./common/utils/polyfills" // necessary for IE11
import "whatwg-fetch"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { persistCache } from "apollo-cache-persist"
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types"
import { createPersistedQueryLink } from "apollo-link-persisted-queries"
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
    REACT_APP_GRAPHQL_SERVER: string
  }
}

// load state from localStorage(if any) to set the initial state for the store
const initialState = hydrateStore({ key: "auth", namespace: "auth" })
const store = configureStore(initialState)

// set up automatic persisted queries
// https://www.apollographql.com/docs/apollo-server/performance/apq/
const link = createPersistedQueryLink().concat(
  createHttpLink({ uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql` }),
)

// Use an InMemoryCache, but keep it synced to localStorage
const cache = new InMemoryCache()
const storage = window.localStorage as PersistentStorage<
  PersistedData<NormalizedCacheObject>
>
const waitOnCache = persistCache({ cache, storage })

const client = new ApolloClient({
  link,
  cache,
})

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

// Wait for the cache to sync before starting the app
waitOnCache.then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CssBaseline />
          <App />
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById("root"),
  )
})

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
