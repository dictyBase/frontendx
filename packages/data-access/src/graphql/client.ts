import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloCache,
  DefaultOptions,
  ApolloLink,
  InMemoryCache,
  from,
} from "@apollo/client"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

/**
 * The props for {@link useGraphqlClient}
 */
export interface useGraphqlClientProperties {
  /** The cache for apollo client to store query result */
  cache?: ApolloCache<NormalizedCacheObject>
  /** application wide default value for the client */
  clientOptions?: DefaultOptions
  /**
   * An {@link https://www.apollographql.com/docs/react/api/link/introduction/
   * | Apollo link} for handling graphql error
   */
  errorHandler?: ApolloLink
  /** The url of graphql endpoint */
  uri: string
}

export const apolloOptions: DefaultOptions = {
  watchQuery: {
    notifyOnNetworkStatusChange: true,
  },
  query: {
    notifyOnNetworkStatusChange: true,
  },
}
/**
 * A react hook for getting a fully configured apollo client.
 * The client is instantiated only once during the mounting of
 * the root component.
 */
export function useGraphqlClient({
  uri,
  errorHandler,
  clientOptions = apolloOptions,
  cache = new InMemoryCache(),
}: useGraphqlClientProperties): ApolloClient<NormalizedCacheObject> {
  // const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const uploadLink = createUploadLink({
    uri,
  })
  const link = errorHandler
    ? from([errorHandler, uploadLink])
    : from([uploadLink])
  return new ApolloClient({
    link,
    cache,
    defaultOptions: clientOptions,
  })
}
