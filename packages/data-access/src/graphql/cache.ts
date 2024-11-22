import { TypePolicies, InMemoryCache } from "@apollo/client"
import {
  CachePersistor,
  SessionStorageWrapper,
  LocalForageWrapper,
} from "apollo3-cache-persist"
import localForage from "localforage"
import { useMemo, useEffect, useState } from "react"
import { version } from "dicty-graphql-schema/package.json"

const SCHEMA_VERSION_KEY = "dicty-graphql-schema-version"

/**
 * Different storage backend for apollo cache
 */
export enum storageType {
  /** localstorage */
  LOCAL = "LOCAL",
  /** sessionstorage */
  SESSION = "SESSION",
  /** indexdb */
  INDEX = "INDEX",
}

/**
 * The props for {@link apolloClientCache}
 */
export interface apolloClientCacheProperties {
  /**
   * Custom object to customize the cache's behaviour.
   * For details look {@link https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicies | here}
   */
  customPolicies?: TypePolicies
  storage?: storageType
  key?: string
}

/**
 * Returns an instance of apollo client cache that can be customized
 * with type policies.
 */
export function useApolloClientCache({
  customPolicies,
  storage = storageType.LOCAL,
  key,
}: apolloClientCacheProperties) {
  const mc = useMemo(
    () =>
      customPolicies
        ? new InMemoryCache({ typePolicies: customPolicies })
        : new InMemoryCache(),
    [customPolicies],
  )
  const [cache, setCache] = useState<InMemoryCache>(mc)
  const [isInitializing, setIsInitializing] = useState(true)
  useEffect(() => {
    const initCache = async () => {
      let persistor
      const options = key ? { cache: mc, key } : { cache: mc }
      switch (storage) {
        case "LOCAL":
          localForage.setDriver(localForage.LOCALSTORAGE)
          persistor = new CachePersistor({
            ...options,
            storage: new LocalForageWrapper(localForage),
          })
          break
        case "INDEX":
          localForage.setDriver(localForage.INDEXEDDB)
          persistor = new CachePersistor({
            ...options,
            storage: new LocalForageWrapper(localForage),
          })
          break
        case "SESSION":
          persistor = new CachePersistor({
            ...options,
            storage: new SessionStorageWrapper(window.sessionStorage),
          })
          break
        default:
          break
      }
      if (!persistor) {
        setIsInitializing(false)
        return
      }
      const currentVersion = await localForage.getItem(SCHEMA_VERSION_KEY)
      if (currentVersion === version) {
        // If the current version matches the latest version,
        // we're good to go and can restore the cache.
        await persistor.restore()
      } else {
        // Otherwise, we'll want to purge the outdated persisted cache
        // and mark ourselves as having updated to the latest version.
        await persistor.purge()
        await localForage.setItem(SCHEMA_VERSION_KEY, version)
      }
      setIsInitializing(false)
    }
    initCache()
    setCache(mc)
  }, [mc, storage, key])
  return { cache, isInitializing }
}
