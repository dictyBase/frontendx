/* eslint-disable unicorn/filename-case */
import { ApolloError } from "@apollo/client"
import { ServerError } from "./ServerError"
import { NotFoundError } from "./NotFoundError"
import { OtherError } from "./OtherError"
import { Fallback } from "./Fallback"

type GraphQlErrorPageProperties = {
  /** GraphQL error object */
  error: ApolloError
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 * Returns one of the other error components based on the error code.
 */

const GraphQLErrorPage = ({ error }: GraphQlErrorPageProperties) => {
  if (!error || !error.message) return <Fallback />

  if (error.networkError) {
    // eslint-disable-next-line no-console
    console.error(error.networkError)
    return <ServerError />
  }

  let errorCode
  let errorMessage

  if (error.graphQLErrors && error.graphQLErrors[0]?.extensions) {
    // eslint-disable-next-line dot-notation
    errorCode = error.graphQLErrors[0].extensions["code"]
    errorMessage = error.graphQLErrors[0].message
  }

  if (errorCode === "Unavailable") {
    return <ServerError />
  }

  if (errorCode === "NotFound" && errorMessage) {
    return (
      <NotFoundError
        error={errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
      />
    )
  }

  return <OtherError />
}

export { GraphQLErrorPage }
