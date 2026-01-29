import { ApolloError } from "@apollo/client"
import { GraphQLError } from "graphql"

const mockNotFoundGraphQLError = new GraphQLError("could not find gene with ID banana", {
  extensions: { code: "NotFound" },
})

const mockUnavailableGraphQLError = new GraphQLError("server is unavailable", {
  extensions: { code: "Unavailable" },
})

const mockOtherGraphQLError = new GraphQLError("unknown test error", {
  extensions: { code: "Unknown" },
})

const mockGraphQLErrorPagePropsNotFound = {
  error: new ApolloError({
    graphQLErrors: [mockNotFoundGraphQLError],
  }),
}

const mockGraphQLErrorPagePropsUnavailable = {
  error: new ApolloError({
    graphQLErrors: [mockUnavailableGraphQLError],
  }),
}

const mockGraphQLErrorPagePropsOther = {
  error: new ApolloError({
    graphQLErrors: [mockOtherGraphQLError],
  }),
}

const mockGraphQLErrorPagePropsNetworkError = {
  error: new ApolloError({
    networkError: new Error("Network error occurred"),
  }),
}

export {
  mockGraphQLErrorPagePropsNotFound,
  mockGraphQLErrorPagePropsUnavailable,
  mockGraphQLErrorPagePropsOther,
  mockGraphQLErrorPagePropsNetworkError,
}
