import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import RefreshIcon from "@mui/icons-material/Refresh"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { grey } from "@mui/material/colors"

type Properties = {
  /** Title of the error panel */
  title?: string
  /** Main error message to display */
  message?: string
  /** Detailed error information */
  details?: string
  /** Email address for support contact */
  supportEmail?: string
  retry: () => {}
}

/**
 * ErrorPanel component displays error information in a styled panel
 * that matches the dictyBase design system.
 */
const ErrorPanel = ({
  title = "Sorry, something went wrong.",
  message = "We encountered an unexpected error while processing your request.",
  details = "The server encountered an internal error and was unable to complete your request.",
  supportEmail = "dictybase@northwestern.edu",
  retry,
}: Properties) => {
  const handleRefresh = () => {
    retry()
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      sx={{ padding: "2rem", backgroundColor: grey[100] }}
      spacing={1}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <ErrorOutlineIcon
              sx={{ color: "primary.main", fontSize: "4rem" }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#004080",
                marginBottom: 2,
              }}>
              {title}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="stretch" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                height: "100%",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                padding: 2,
                marginBottom: 3,
              })}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Error Details
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {details}
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
                    onClick={handleRefresh}
                    startIcon={<RefreshIcon sx={{ marginRight: 1 }} />}>
                    Retry
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                height: "100%",
                backgroundColor: "#E3F2FD",
                border: "1px solid rgba(0, 64, 128, 0.3)",
                borderRadius: theme.shape.borderRadius,
                padding: 2,
              })}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Need assistance?
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                If this problem persists, please email us at:
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
  )
}

export { ErrorPanel }
