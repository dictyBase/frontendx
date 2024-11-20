/* eslint-disable unicorn/filename-case */
import { ApolloError } from "@apollo/client"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import {
  map as Omap,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match, P } from "ts-pattern"
import { ServerError } from "./ServerError"
import { NotFoundError } from "./NotFoundError"
import { OtherError } from "./OtherError"

type GraphQlErrorPageProperties = {
  /** GraphQL error object */
  error: ApolloError
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 * Returns one of the other error components based on the error code.
 */

const GraphQLErrorPage = ({ error }: GraphQlErrorPageProperties) =>
  match(error)
    .with({ networkError: P.not(P.nullish) }, () => <ServerError />)
    .with({ graphQLErrors: P.select(P.not(P.nullish)) }, (errors) => {
      const primaryError = pipe(errors, RAhead)
      const primaryErrorCode = pipe(
        primaryError,
        OflatMap(({ extensions }) =>
          pipe(
            extensions,
            OfromNullable,
            // eslint-disable-next-line dot-notation
            Omap((extension) => extension["code"] as string),
          ),
        ),
        OgetOrElse(() => ""),
      )
      const primaryErrorMessage = pipe(
        primaryError,
        Omap(({ message }) => message),
        OgetOrElse(() => ""),
      )
      return match(primaryErrorCode)
        .with("Unavailable", () => <ServerError />)
        .with("NotFound", () => <NotFoundError />)
        .otherwise(() => <OtherError message={primaryErrorMessage} />)
    })
    .otherwise(() => <OtherError />)

export { GraphQLErrorPage }
