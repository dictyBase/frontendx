import React from "react"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist"
import localForage from "localforage"
import { version as SCHEMA_VERSION } from "dicty-graphql-schema/package.json"

const SCHEMA_VERSION_KEY = "publication-apollo-schema-version"
const PUBLICATION_CACHE_KEY = "publication-apollo-cache-persist"

const mutationList = ["Logout"]

const isMutation = (value: string) => {
  if (mutationList.includes(value)) {
    return true
  }
  return false
}

const getGraphQLServer = (url: string, deployEnv: string, origin: string) => {
  if (deployEnv === "staging" && origin === "https://dictycr.org") {
    return process.env.NEXT_PUBLIC_ALT_GRAPHQL_SERVER
  }
  return url
}

const cache = new InMemoryCache()

const authLink = setContext((request, { headers }) => {
  const mutation = isMutation(request.operationName || "")
  return {
    headers: {
      ...headers,
      "X-GraphQL-Method": mutation ? "Mutation" : "Query",
    },
  }
})

const createApolloLink = (server: string): ApolloLink =>
  authLink.concat(
    createHttpLink({
      uri: `${server}/graphql`,
      credentials: "include",
    }),
  )

const useCreateApolloClient = () => {
  const [cacheInitializing, setCacheInitializing] = React.useState(true)
  const [link, setLink] = React.useState<ApolloLink>()

  // Set ApolloLink in useEffect. See: https://frontend-digest.com/why-is-window-not-defined-in-nextjs-44daf7b4604e
  React.useEffect(() => {
    const server = getGraphQLServer(
      process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
      process.env.NEXT_PUBLIC_DEPLOY_ENV,
      window.location.origin,
    )
    setLink(createApolloLink(server))
  }, [])

  React.useEffect(() => {
    const initializeCache = async () => {
      const persistor = new CachePersistor({
        cache,
        storage: new LocalForageWrapper(localForage),
        key: PUBLICATION_CACHE_KEY,
      })
      const currentVersion = await localForage.getItem(SCHEMA_VERSION_KEY)
      if (currentVersion === SCHEMA_VERSION) {
        // If the current version matches the latest version,
        // we're good to go and can restore the cache.
        await persistor.restore()
      } else {
        // Otherwise, we'll want to purge the outdated persisted cache
        // and mark ourselves as having updated to the latest version.
        await persistor.purge()
        await localForage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
      }
      setCacheInitializing(false)
    }

    initializeCache()
  }, [])

  const client = new ApolloClient({
    cache,
    link,
  })

  return { client, cacheInitializing }
}

export { isMutation, getGraphQLServer }
export default useCreateApolloClient
