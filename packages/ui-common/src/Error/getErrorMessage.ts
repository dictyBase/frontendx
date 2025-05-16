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

enum ErrorMessage {
  NETWORK = "The requested resource is unavailable",
  NETWORK_SERVER = "The server encountered an unexpected error",
  PROTOCOL = "The requested resource is unavailable",
  CLIENT = "The requested resource is unavailable",
  UNAVAILABLE = "The requested resource is unavailable",
  NOT_FOUND = "The requested resource was not found",
  DEFAULT = "An unexpected error occurred."
}

const getErrorMessage = (error: ApolloError) =>
  match(error)
    .with({ cause: { message: "networkError" } }, () => ErrorMessage.NETWORK)
    .with({ cause: { message: "graphQLError", extensions: P.select(P.array(P.any)) } }, (extensions) => {
      const primaryError = pipe(extensions, RAhead)
      const primaryErrorCode = pipe(
        primaryError,
        Omap((extensions) => pipe(extensions["code"] as string)),
        OgetOrElse(() => ""),
      )
      return match(primaryErrorCode)
        .with("Unavailable", () => ErrorMessage.UNAVAILABLE)
        .with("NotFound", () => ErrorMessage.NOT_FOUND)
        .otherwise(() => ErrorMessage.DEFAULT)
    })
    .with({ cause: { message: "protocolError" } }, () => ErrorMessage.NETWORK)
    .with({ cause: { message: "clientError" } }, () => ErrorMessage.NETWORK)
    .otherwise(() => ErrorMessage.DEFAULT)

  export { getErrorMessage }
