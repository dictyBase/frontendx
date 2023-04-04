import { ApolloError } from "@apollo/client"

/**
 * The prop type for {@link ErrorDisplay}
 */
export interface ErrorDisplayProperties {
  /** The error object of apollo client */
  error: ApolloError | undefined
}

/**
 * Display error(s) coming from apollo client API call
 */
export const ErrorDisplay = ({ error }: ErrorDisplayProperties) => (
  <h2>Error..... {error?.message}</h2>
)
