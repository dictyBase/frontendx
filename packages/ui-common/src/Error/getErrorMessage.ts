import { ApolloError } from "@apollo/client"
import { GraphQLErrorExtensions, GraphQLFormattedError } from "graphql"
import { pipe } from "fp-ts/function"
import {
  head as RAhead,
  isNonEmpty as RAisNonEmpty,
  findFirst as RAfindFirst,
} from "fp-ts/ReadonlyArray"
import {
  Option,
  none,
  some,
  map as Omap,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  match as Omatch,
} from "fp-ts/Option"
import { match, P } from "ts-pattern"

enum ErrorMessage {
  NETWORK = "The server encountered an unexpected error",
  PROTOCOL = "There was an issue with the request (client error)",
  CLIENT = "There was an issue with the request (protocol error)",
  GQL_UNAVAILABLE = "The requested resource is unavailable",
  GQL_NOT_FOUND = "The requested resource was not found",
  DEFAULT = "An unexpected error occurred.",
}

type ErrorResult = {
  message: ErrorMessage
  code: Option<string>
}

const getCodeFromExtensions = (
  extensionsArray: Array<GraphQLErrorExtensions>,
) =>
  pipe(
    extensionsArray,
    RAhead,
    // @ts-ignore
    Omap((extensions) => pipe(extensions.code as string)),
  )

const getErrorMessage = (error: ApolloError): ErrorResult =>
  match(error)
    .with({ networkError: P.select(P.not(P.nullish)) }, (networkError) => ({
      message: ErrorMessage.NETWORK,
      code: pipe(
        networkError,
        OfromNullable,
        OflatMap((someNetworkError) =>
          match(someNetworkError)
            .with({ statusCode: P.select(P.number) }, (code) => some(code))
            .otherwise(() => none),
        ),
        Omap(String),
      ),
    }))
    .with(
      {
        graphQLErrors: P.select(P.when((errors) => RAisNonEmpty(errors))),
      },
      (gqlErrors) => {
        const Oerror = pipe(
          gqlErrors,
          RAfindFirst((gqlError) =>
            Object.prototype.hasOwnProperty.call(gqlError, "extensions"),
          ),
        ) as Option<
          Required<Pick<GraphQLFormattedError, "extensions">> &
          Omit<GraphQLFormattedError, "extensions">
        >
        const primaryErrorCode = pipe(
          Oerror,
          // @ts-ignore
          Omap(({ extensions }) => extensions.code as string),
        )
        return pipe(
          primaryErrorCode,
          Omatch(
            () => ({ message: ErrorMessage.DEFAULT, code: none }),
            (code) =>
              match(code)
                .with("Unavailable", () => ({
                  message: ErrorMessage.GQL_UNAVAILABLE,
                  code: primaryErrorCode,
                }))
                .with("NotFound", () => ({
                  message: ErrorMessage.GQL_NOT_FOUND,
                  code: primaryErrorCode,
                }))
                .otherwise(() => ({
                  message: ErrorMessage.DEFAULT,
                  code: none,
                })),
          ),
        )
      },
    )
    .with(
      {
        protocolErrors: P.select(P.when((errors) => RAisNonEmpty(errors))),
      },
      (protocolErrors) => ({
        message: ErrorMessage.PROTOCOL,
        code: pipe(
          protocolErrors,
          RAhead,
          OflatMap(({ extensions }) => OfromNullable(extensions)),
          OflatMap(getCodeFromExtensions),
        ),
      }),
    )
    .with(
      { clientErrors: P.select(P.when((errors) => RAisNonEmpty(errors))) },
      () => ({
        message: ErrorMessage.CLIENT,
        code: none,
      }),
    )
    .otherwise(() => ({ message: ErrorMessage.DEFAULT, code: none }))

export { getErrorMessage }
