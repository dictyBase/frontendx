/* eslint-disable unicorn/filename-case */
import { ApolloError } from "@apollo/client"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import { blue, grey } from "@material-ui/core/colors"
import { ErrorDisplay } from "./ErrorDisplay"
import { getErrorMessage } from "./getErrorMessage"

const useStyles = makeStyles({
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
})

type GraphQlErrorPageProperties = {
  /** GraphQL error object */
  error: ApolloError
  handleNavigateHome: () => void
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 */
const GraphQLErrorPage = ({ error, handleNavigateHome }: GraphQlErrorPageProperties) => {
  const classes = useStyles()

  const { message } = getErrorMessage(error)
  return (
    <Paper className={classes.container}>
      <ErrorDisplay details={message} handleNavigateHome={handleNavigateHome} />
    </Paper>
  )
}

export { GraphQLErrorPage }
