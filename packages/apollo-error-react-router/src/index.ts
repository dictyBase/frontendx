import { onError } from "@apollo/client/link/error"
import { useNavigate } from "react-router-dom"

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
 * An apollo {@link https://www.apollographql.com/docs/react/api/link/apollo-link-error/ | Error Link handler}
 * uses {@link https://nextjs.org/docs/api-reference/next/router| react router}
 * to redirect the page to a custom(or default)
 * route. The routes are expected to be handled
 * by a react component.
 */
export function useErrorLink({
  networkPath = "/errors/network",
  graphqlPath = "/errors/graphql",
}) {
  const navigate = useNavigate()
  return onError(({ networkError, graphQLErrors }) => {
    if (networkError) {
      navigate(networkPath, { replace: true })
    }
    if (graphQLErrors) {
      navigate(graphqlPath, { replace: true })
    }
  })
}
