import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { ErrorMessage } from "./ErrorMessage"
import { errorStyles } from "./errorStyles"

/**
 * UI display when there is a server error.
 */

const ServerError = () => (
  <Grid container sx={errorStyles.mainGrid} justifyContent="center">
    <Grid item xs={10} md={8}>
      <Box sx={errorStyles.error500}>
        <h2>Sorry! There was a server error.</h2>
        <ErrorMessage />
      </Box>
    </Grid>
  </Grid>
)

export { ServerError }
