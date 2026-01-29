import { ApolloError } from "@apollo/client"
import { GraphQLError } from "graphql"

const mockErrorPagePropsArray = [
  {
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError("Failed to fetch data", {
          extensions: { code: "FETCH_ERROR" },
        }),
      ],
    }),
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
  {
    error: new ApolloError({
      networkError: new Error("Network request failed"),
    }),
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
  {
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError("Resource not found", {
          extensions: { code: "NotFound" },
        }),
      ],
    }),
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
]

export { mockErrorPagePropsArray }
