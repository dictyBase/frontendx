import { onError } from "@apollo/client/link/error"
import { useNavigate } from "react-router-dom"

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
 * An apollo {@link https://www.apollographql.com/docs/react/api/link/apollo-link-error/ | Error Link handler}
 * that reports the errors in the
 * browser's console and uses {@link https://nextjs.org/docs/api-reference/next/router| react router}
 * redirect the page to a custom(or default)
 * route. The routes are expected to be handled
 * by a react component.
 */
export function errorLink({
  networkPath = "/errors/network",
  graphqlPath = "/errors/graphql",
}) {
  const navigate = useNavigate()
  return onError(({ networkError, graphQLErrors, operation }) => {
    const name = operation.operationName
    if (networkError) {
      console.error(`[Network error]: ${networkError} [operation]: ${name}`)
      navigate(networkPath, { replace: true })
    }
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.error(
          `[GraphQL error]: ${message} [operation]: ${name}`,
        )
      })
      navigate(graphqlPath, { replace: true })
    }
  })
}
