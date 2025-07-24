import { ApolloErrorOptions } from "@apollo/client/errors"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import {
  match as Omatch,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
} from "fp-ts/Option"

const codeMessageMap: { [k: string]: string } = {
  unexpected: "An unexpected error has occurred",
}

const getGraphqlErrorCode = (
  graphqlErrors: NonNullable<ApolloErrorOptions["graphQLErrors"]>,
) =>
  pipe(
    graphqlErrors,
    RAhead,
    OflatMap(({ extensions }) => OfromNullable(extensions)),
    Omatch(
      () => "unexpected",
      (extension) =>
        // eslint-disable-next-line dot-notation
        extension["code"] as string,
    ),
  )

const mapCodeToMessage = (code: string) => codeMessageMap[code]

export { getGraphqlErrorCode, mapCodeToMessage }
