import { ApolloError } from "@apollo/client"
import Paper from "@mui/material/Paper"
import { makeStyles } from 'tss-react/mui';
import { blue, grey } from "@mui/material/colors"
import { ErrorDisplay } from "./ErrorDisplay"
import { getErrorMessage } from "./getErrorMessage"

const useStyles = makeStyles()({
  container: {
    backgroundColor: blue[50],
    color: grey[600],
  },
  grid: {
    minHeight: "10rem",
  },
  icon: {
    fontSize: "4rem",
  },
});

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
  const { classes } = useStyles()

  const { message } = getErrorMessage(error)
  return (
    <Paper className={classes.container}>
      <ErrorDisplay
        details={message}
        handleNavigateHome={handleNavigateHome}
        handleReload={handleReload}
      />
    </Paper>
  )
}

export { ErrorPage }
