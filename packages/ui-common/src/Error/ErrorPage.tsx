import { ApolloError } from "@apollo/client"
import Paper from "@mui/material/Paper"
import { blue, grey } from "@mui/material/colors"
import { ErrorDisplay } from "./ErrorDisplay"
import { getErrorMessage } from "./getErrorMessage"

type GraphQlErrorPageProperties = {
  /** GraphQL error object */
  error: ApolloError
  handleNavigateHome: () => void
  handleReload: () => void
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 */
const ErrorPage = ({
  error,
  handleNavigateHome,
  handleReload,
}: GraphQlErrorPageProperties) => {
  const { message } = getErrorMessage(error)
  return (
    <Paper sx={{ backgroundColor: blue[50], color: grey[600] }}>
      <ErrorDisplay
        details={message}
        handleNavigateHome={handleNavigateHome}
        handleReload={handleReload}
      />
    </Paper>
  )
}

export { ErrorPage }
