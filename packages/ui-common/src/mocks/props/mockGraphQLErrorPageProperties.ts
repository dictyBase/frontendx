/* eslint-disable unicorn/filename-case */
import { ApolloError } from "@apollo/client"
import { GraphQLError } from "graphql"

const mockGraphQLErrorPagePropertiesArray = [
  {
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError("could not find gene with ID banana", {
          extensions: { code: "NotFound" },
        }),
      ],
    }),
  },
  {
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError("server is unavailable", {
          extensions: { code: "Unavailable" },
        }),
      ],
    }),
  },
  {
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError("unknown test error", {
          extensions: { code: "Unknown" },
        }),
      ],
    }),
  },
  {
    error: new ApolloError({
      networkError: new Error("Network error occurred"),
    }),
  },
]

export { mockGraphQLErrorPagePropertiesArray }
