import { type ApolloError } from "@apollo/client/errors"
import { match, P } from "ts-pattern"
import { ServerError } from "./ServerError"
import { OtherError } from "./OtherError"

const contentPageErrorMatcher = (
  apolloError: ApolloError,
  notFoundHandler: () => JSX.Element,
) =>
  match(apolloError)
    .with({ networkError: P.not(P.nullish) }, () => <ServerError />)
    .with(
      { graphQLErrors: P.select(P.array({ extensions: P.string })) },
      (errors) =>
        // eslint-disable-next-line dot-notation
        match(errors[0]?.extensions["code"])
          .with("Unavailable", () => <ServerError />)
          .with("NotFound", notFoundHandler)
          .otherwise(() => <OtherError />),
    )
    .otherwise(() => <OtherError />)

export { contentPageErrorMatcher }
