/* eslint-disable unicorn/filename-case */
import { ApolloError } from "@apollo/client"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import {
  map as Omap,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match, P } from "ts-pattern"
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
}

/**
 * Displays any errors found when issuing a GraphQL query or mutation.
 * Returns one of the other error components based on the error code.
 */

const GraphQLErrorPage = ({ error }: GraphQlErrorPageProperties) => {
  const classes = useStyles()

  const { message } = getErrorMessage(error)
  return (
    <Paper className={classes.container}>
      <ErrorDisplay details={message} />
    </Paper>
  )
}

export { GraphQLErrorPage }
