import { TypePolicies, InMemoryCache } from "@apollo/client"
import {
  persistCache,
  SessionStorageWrapper,
  LocalForageWrapper,
} from "apollo3-cache-persist"
import localForage from "localforage"
import { useEffect, useState } from "react"

/**
 * Different storage backend for apollo cache
 */
export enum storageType {
  /** localstorage*/
  LOCAL = "LOCAL",
  /** sessionstorage*/
  SESSION = "SESSION",
  /**indexdb*/
  INDEX = "INDEX",
}

/**
 * The props for {@link apolloClientCache}
 */
export interface apolloClientCacheProps {
  /**
   * Custom object to customize the cache's behaviour.
   * For details look {@link https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicies | here}
   */
  customPolicies?: TypePolicies
  storage?: storageType
}

/**
 * Returns an instance of apollo client cache that can be customized
 * with type policies.
 */
export function apolloClientCache({
  customPolicies,
  storage,
}: apolloClientCacheProps) {
  const mc = customPolicies
    ? new InMemoryCache({ typePolicies: customPolicies })
    : new InMemoryCache()
  const [cache, setCache] = useState<InMemoryCache>(mc)
  useEffect(() => {
    const initCache = async () => {
      switch (storage) {
        case "LOCAL":
          localForage.setDriver(localForage.LOCALSTORAGE)
          await persistCache({
            cache: mc,
            storage: new LocalForageWrapper(localForage),
          })
          break
        case "INDEX":
          localForage.setDriver(localForage.INDEXEDDB)
          await persistCache({
            cache: mc,
            storage: new LocalForageWrapper(localForage),
          })
          break
        case "SESSION":
          await persistCache({
            cache: mc,
            storage: new SessionStorageWrapper(window.sessionStorage),
          })
          break
        default:
          break
      }
    }
    initCache()
    setCache(mc)
  }, [])
  return cache
}
