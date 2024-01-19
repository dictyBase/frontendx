import { type GraphQLErrors, type ApolloError } from "@apollo/client/errors"
import { pipe } from "fp-ts/function"
import {
  fromArray,
  filter as readonlyArrayFilter,
  isNonEmpty,
} from "fp-ts/lib/ReadonlyArray"
import { getOrElse, fromNullable } from "fp-ts/Option"

const hasNotFoundError = (apolloError: ApolloError | undefined) =>
  pipe(
    apolloError,
    fromNullable,
    getOrElse(() => ({
      graphQLErrors: fromArray([]) as GraphQLErrors,
    })),
    ({ graphQLErrors }) => graphQLErrors,
    readonlyArrayFilter((gqlError) => gqlError.extensions?.code === "NotFound"),
    isNonEmpty,
  )

export { hasNotFoundError }
