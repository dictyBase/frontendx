import { onError } from "@apollo/client/link/error"
import { useRouter } from "next/router"

/**
 * The props for {@link errorLink}
 */
export interface errorLinkProperties {
  /** path to route for network error */
  networkPath?: string
  /** path to route for graphql errors */
  graphqlPath?: string
}

/**
 * An apollo @see [error link handler](https://www.apollographql.com/docs/react/api/link/apollo-link-error)
 * that reports the errors in the
 * browser's console and uses @see [nextjs router](https://nextjs.org/docs/api-reference/next/router)
 * redirect the page to a custom(or default)
 * route. The routes are expected to be handled
 * by a react component.
 */
export function useErrorLink({
  networkPath = "/errors/network",
  graphqlPath = "/errors/graphql",
}) {
  const router = useRouter()
  return onError(({ networkError, graphQLErrors }) => {
    if (networkError) {
      router.replace(networkPath)
    }
    if (graphQLErrors) {
      router.replace(graphqlPath)
    }
  })
}
