import { type ApolloError } from "@apollo/client/errors"
import { pipe } from "fp-ts/function"
import { exists as ROAexists } from "fp-ts/lib/ReadonlyArray"
import {
  bindTo as ObindTo,
  let as Olet,
  getOrElse as OgetOrElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"

const hasNotFoundError = (apolloError: ApolloError | undefined) =>
  pipe(
    apolloError,
    OfromNullable,
    ObindTo("apolloError"),
    Olet(
      "graphQLErrors",
      ({ apolloError: { graphQLErrors } }) => graphQLErrors,
    ),
    Olet("notFound", ({ graphQLErrors }) =>
      pipe(
        graphQLErrors,
        ROAexists((gqlError) => gqlError.extensions?.code === "NotFound"),
      ),
    ),
    Omap(({ notFound }) => notFound),
    OgetOrElse(() => false),
  )

export { hasNotFoundError }
