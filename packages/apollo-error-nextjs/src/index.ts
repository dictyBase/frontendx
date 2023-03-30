import { onError } from "@apollo/client/link/error"
import { useRouter } from "next/router"

/**
 * The props for {@link errorLink}
 */
export interface errorLinkProps {
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
export function errorLink({
  networkPath = "/errors/network",
  graphqlPath = "/errors/graphql",
}) {
  const router = useRouter()
  return onError(({ networkError, graphQLErrors, operation }) => {
    const name = operation.operationName
    if (networkError) {
      console.error(`[Network error]: ${networkError} [operation]: ${name}`)
      router.replace(networkPath)
    }
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.error(`[GraphQL error]: ${message} [operation]: ${name}`)
      })
      router.replace(graphqlPath)
    }
  })
}
