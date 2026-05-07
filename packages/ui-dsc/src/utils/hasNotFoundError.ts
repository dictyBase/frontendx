import { ApolloError } from "@apollo/client"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  map as ROAmap,
  compact as ROAcompact,
  exists as ROAexists,
} from "fp-ts/ReadonlyArray"

const hasNotFoundError = (error: ApolloError | undefined) =>
  pipe(
    error,
    OfromNullable,
    Omap(({ graphQLErrors }: ApolloError) => graphQLErrors),
    Omap(ROAmap(({ extensions }) => OfromNullable(extensions))),
    Omap(ROAcompact),
    // eslint-disable-next-line dot-notation
    Omap(ROAexists((extension) => extension["code"] === "NotFound")),
    OgetOrElse(() => false),
  )

export { hasNotFoundError }
