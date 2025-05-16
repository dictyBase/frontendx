import { ApolloError } from "@apollo/client"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
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

enum ErrorMessage {
  NETWORK = "The requested resource is unavailable",
  NETWORK_SERVER = "The server encountered an unexpected error",
  PROTOCOL = "The requested resource is unavailable",
  CLIENT = "The requested resource is unavailable",
  UNAVAILABLE = "The requested resource is unavailable",
  NOT_FOUND = "The requested resource was not found",
  DEFAULT = "An unexpected error occurred.",
}

type ErrorResult = {
  message: ErrorMessage
  code: Option<string>
}

const getErrorMessage = (error: ApolloError): ErrorResult =>
  match(error)
    .with({ cause: { message: "networkError" } }, () => ({
      message: ErrorMessage.NETWORK,
      code: none,
    }))
    .with(
      {
        cause: {
          message: "graphQLError",
          extensions: P.select(P.array(P.any)),
        },
      },
      (extensions) => {
        const primaryErrorCode = pipe(
          extensions,
          RAhead,
          Omap((extensions) => pipe(extensions["code"] as string)),
        )
        return pipe(
          primaryErrorCode,
          Omatch(
            () => ({ message: ErrorMessage.DEFAULT, code: none }),
            (code) =>
              match(code)
                .with("Unavailable", () => ({
                  message: ErrorMessage.UNAVAILABLE,
                  code: primaryErrorCode,
                }))
                .with("NotFound", () => ({
                  message: ErrorMessage.NOT_FOUND,
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
        const primaryErrorCode = pipe(
          extensions,
          RAhead,
          Omap((extensions) => pipe(extensions["code"] as string)),
        )
        return { message: ErrorMessage.PROTOCOL, code: primaryErrorCode }
      },
    )
    .with({ cause: { message: "clientError" } }, () => ({
      message: ErrorMessage.CLIENT,
      code: none,
    }))
    .otherwise(() => ({ message: ErrorMessage.DEFAULT, code: none }))

export { getErrorMessage }
