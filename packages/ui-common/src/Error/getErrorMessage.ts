import { ApolloError } from "@apollo/client"
import { GraphQLErrorExtensions } from "graphql"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import { lookup as Rlookup } from "fp-ts/Record"
import {
  Option,
  none,
  some,
  map as Omap,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  match as Omatch,
} from "fp-ts/Option"
import { match, P } from "ts-pattern"

// some of these error messages do not correspond
enum ErrorMessage {
  NETWORK = "The server encountered an unexpected error",
  PROTOCOL = "The requested resource is unavailable",
  CLIENT = "The requested resource is unavailable",
  GQL_UNAVAILABLE = "The requested resource is unavailable",
  GQL_NOT_FOUND = "The requested resource was not found",
  DEFAULT = "An unexpected error occurred.",
}

type ErrorResult = {
  message: ErrorMessage
  code: Option<string>
}

const getCodeFromExtensions = (extensions: Array<GraphQLErrorExtensions>) =>
  pipe(
    extensions,
    RAhead,
    Omap((extensions) => pipe(extensions["code"] as string)),
  )

const getErrorMessage = (error: ApolloError): ErrorResult =>
  match(error)
    .with({ cause: { message: "networkError" } }, ({ networkError }) => ({
      message: ErrorMessage.NETWORK,
      code: pipe(
        networkError,
        OfromNullable,
        OflatMap((error) =>
          match(error)
            .with({ statusCode: P.select(P.number) }, (code) => some(code))
            .otherwise(() => none),
        ),
        Omap(String)
      ),
    }))
    .with(
      {
        cause: {
          message: "graphQLError",
          extensions: P.select(P.array(P.any)),
        },
      },
      (extensions) => {
        const primaryErrorCode = getCodeFromExtensions(extensions)
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
        cause: {
          message: "protocolError",
          extensions: P.select(P.array(P.any)),
        },
      },
      (extensions) => {
        return {
          message: ErrorMessage.PROTOCOL,
          code: getCodeFromExtensions(extensions),
        }
      },
    )
    .with({ cause: { message: "clientError" } }, () => ({
      message: ErrorMessage.CLIENT,
      code: none,
    }))
    .otherwise(() => ({ message: ErrorMessage.DEFAULT, code: none }))

export { getErrorMessage }
