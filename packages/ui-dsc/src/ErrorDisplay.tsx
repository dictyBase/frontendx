import { ApolloError } from "@apollo/client"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import sadDicty from "./assets/sad-dicty.png"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
})
/**
 * The prop type for {@link ErrorDisplay}
 */
export interface ErrorDisplayProperties {
  /** The error object of apollo client */
  error: ApolloError
}

/**
 * Display error(s) coming from apollo client API call
 */
export const ErrorDisplay = ({ error }: ErrorDisplayProperties) => {
  const { root } = useStyles()
  const errorMessage = error.graphQLErrors[0]?.message ?? ""
  return (
    <Grid container className={root} direction="column">
      <Grid item>
        <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
      </Grid>
      <Grid item>
        <Typography variant="h1">
          {errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
        </Typography>
      </Grid>
    </Grid>
  )
}
