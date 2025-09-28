import Grid from "@mui/material/Grid"
import { ErrorMessage } from "./ErrorMessage"
import { Error500Container, MainGrid } from "./errorStyles"

/**
 * UI display when there is a server error.
 */

const ServerError = () => (
  <MainGrid container justifyContent="center">
    <Grid item xs={10} md={8}>
      <Error500Container>
        <h2>Sorry! There was a server error.</h2>
        <ErrorMessage />
      </Error500Container>
    </Grid>
  </MainGrid>
)

export { ServerError }
