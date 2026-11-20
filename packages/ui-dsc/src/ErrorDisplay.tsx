import { ApolloError } from "@apollo/client"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import { getOrElse as OgetOrElse, map as Omap } from "fp-ts/Option"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Theme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import RefreshIcon from "@mui/icons-material/Refresh"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { grey } from "@mui/material/colors"

const infoBoxStyle = (theme: Theme) => ({
  height: "100%",
  backgroundColor: "#E3F2FD",
  border: "1px solid rgba(0, 64, 128, 0.3)",
  borderRadius: theme.shape.borderRadius,
  padding: 2,
})

/**
 * The prop type for {@link ErrorDisplay}
 */
export type ErrorDisplayProperties = {
  /** The error object of apollo client */
  error: ApolloError
  supportEmail?: string
  refetch: () => any
}

const DEFAULT_ERROR_MESSAGE = "An unexpected error has occurred."

const getErrorMessage = ({ extensions }: ApolloError["graphQLErrors"][0]) =>
  match(extensions)
    .with({ code: "Internal" }, () => "An internal server error has occured.")
    .otherwise(() => DEFAULT_ERROR_MESSAGE)
/**
 * Display error(s) coming from apollo client API call
 */
export const ErrorDisplay = ({
  error: { graphQLErrors },
  supportEmail = "dictybase@northwestern.edu",
  refetch,
}: ErrorDisplayProperties) => {
  const handleRetry = () => {
    refetch()
  }
  return (
    <Paper sx={{ padding: 6, backgroundColor: grey[100], height: "100%" }}>
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <ErrorOutlineIcon
                sx={{ color: "primary.contrastText", fontSize: "4rem" }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "#004080",
                  marginBottom: 2,
                }}>
                Sorry, something went wrong
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                We encountered an unexpected error while processing your
                request.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper
                variant="outlined"
                sx={(theme: Theme) => ({
                  height: "100%",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  padding: 2,
                })}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom>
                      Error Details
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {pipe(
                        graphQLErrors,
                        RAhead,
                        Omap(getErrorMessage),
                        OgetOrElse(() => DEFAULT_ERROR_MESSAGE),
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={infoBoxStyle}>
                    <Grid container direction="column" spacing={1}>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          gutterBottom>
                          Troubleshooting
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paragraph>
                          Sometimes refreshing the page can resolve the issue.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#004080",
                            color: "common.white",
                            "&:hover": {
                              backgroundColor: "#003366",
                            },
                          }}
                          onClick={handleRetry}
                          startIcon={<RefreshIcon sx={{ marginRight: 1 }} />}>
                          Retry
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={infoBoxStyle}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom>
                      Need assistance?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      If this prAAAAAAAAAAAAAAAoblem persists, please email us
                      at:
                    </Typography>
                    <Box
                      component="a"
                      href={`mailto:${supportEmail}`}
                      sx={{
                        color: "#004080",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}>
                      {supportEmail}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
