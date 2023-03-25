import { ApolloError } from "@apollo/client"

/**
 * The prop type for {@link ErrorDisplay}
 */
export interface ErrorDisplayProps {
  /** The error object of apollo client */
  error: ApolloError | undefined
}

/**
 * Display error(s) coming from apollo client API call
 */
export function ErrorDisplay({ error }: ErrorDisplayProps): JSX.Element {
  return <h2>Error..... {error?.message}</h2>
}
