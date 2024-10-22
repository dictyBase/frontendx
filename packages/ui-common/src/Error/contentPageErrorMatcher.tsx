import { ApolloError } from "@apollo/client/errors"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import {
  match as Omatch,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
} from "fp-ts/Option"
import { match, P } from "ts-pattern"
import { ServerError } from "./ServerError"
import { OtherError } from "./OtherError"

const contentPageErrorMatcher = (
  apolloError: ApolloError,
  notFoundHandler: () => JSX.Element,
) =>
  match(apolloError)
    .with({ networkError: P.not(P.nullish) }, () => <ServerError />)
    .with({ graphQLErrors: P.select() }, (errors) =>
      pipe(
        errors,
        RAhead,
        OflatMap(({ extensions }) => OfromNullable(extensions)),
        Omatch(
          () => <OtherError />,
          (extension) =>
            match(extension["code"])
              .with("Unavailable", () => <ServerError />)
              .with("NotFound", notFoundHandler)
              .otherwise(() => <OtherError />),
        ),
      ),
    )
    .otherwise(() => <OtherError />)

export { contentPageErrorMatcher }
