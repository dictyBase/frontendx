import { ApolloError } from "@apollo/client"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import sadDicty from "./assets/sad-dicty.png"

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
  const errorMessage = error.graphQLErrors[0]?.message ?? ""
  return (
    <Grid container sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }} direction="column">
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
