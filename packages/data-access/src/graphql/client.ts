import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloCache,
  DefaultOptions,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client"

/**
 * The props for {@link useGraphqlClient}
 */
export interface useGraphqlClientProps {
  /** The cache for apollo client to store query result */
  cache?: ApolloCache<NormalizedCacheObject>
  /** application wide default value for the client */
  clientOpts?: DefaultOptions
  /**
   * An {@link https://www.apollographql.com/docs/react/api/link/introduction/
   * | Apollo link} for handling graphql error
   */
  errorHandler?: ApolloLink
  /** The url of graphql endpoint */
  uri: string
}

export const apolloOpts: DefaultOptions = {
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
  clientOpts = apolloOpts,
  cache = new InMemoryCache(),
}: useGraphqlClientProps): ApolloClient<NormalizedCacheObject> {
  // const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const httpClient = new HttpLink({
    uri: uri,
    headers: { "X-GraphQL-Method": "Query" },
  })
  const link = errorHandler
    ? from([errorHandler, httpClient])
    : from([httpClient])
  return new ApolloClient({
    link,
    cache,
    defaultOptions: clientOpts,
  })
}
