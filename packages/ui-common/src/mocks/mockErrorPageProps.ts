import { ApolloError } from "@apollo/client"
import { GraphQLError } from "graphql"

const mockGraphQLError = new GraphQLError("Failed to fetch data", {
  extensions: { code: "FETCH_ERROR" },
})

const mockErrorPageProps = {
  error: new ApolloError({
    graphQLErrors: [mockGraphQLError],
  }),
  handleNavigateHome: () => {},
  handleReload: () => {},
}

const mockErrorPagePropsNetworkError = {
  error: new ApolloError({
    networkError: new Error("Network request failed"),
  }),
  handleNavigateHome: () => {},
  handleReload: () => {},
}

const mockErrorPagePropsNotFound = {
  error: new ApolloError({
    graphQLErrors: [
      new GraphQLError("Resource not found", {
        extensions: { code: "NotFound" },
      }),
    ],
  }),
  handleNavigateHome: () => {},
  handleReload: () => {},
}

export {
  mockErrorPageProps,
  mockErrorPagePropsNetworkError,
  mockErrorPagePropsNotFound,
}
