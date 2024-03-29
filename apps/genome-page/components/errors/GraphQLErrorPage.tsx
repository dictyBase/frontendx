/* eslint-disable unicorn/filename-case */
import React from "react"
import { ApolloError } from "@apollo/client"
import { ServerError } from "./ServerError"
import { NotFoundError } from "./NotFoundError"
import { OtherError } from "./OtherError"

type Properties = {
  /** GraphQL error object */
  error: ApolloError
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 * Returns one of the other error components based on the error code.
 */

const GraphQLErrorPage = ({ error }: Properties) => {
  if (!error || !error.message) return <></>

  if (error.networkError) {
    return <ServerError />
  }

  let errorCode
  let errorMessage

  if (error.graphQLErrors && error.graphQLErrors[0].extensions) {
    errorCode = error.graphQLErrors[0].extensions.code
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
