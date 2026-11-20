import { Theme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import RefreshIcon from "@mui/icons-material/Refresh"
import HomeIcon from "@mui/icons-material/Home"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { grey } from "@mui/material/colors"

const listItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: 1,
}

const listIconStyle = {
  color: "#004080",
  marginRight: 1,
  marginTop: "2px",
}

const buttonIconStyle = {
  marginRight: 1,
}

type Properties = {
  /** Title of the error panel */
  title?: string
  /** Main error message to display */
  message?: string
  /** Detailed error information */
  details?: string
  /** Email address for support contact */
  supportEmail?: string
  handleNavigateHome: () => void
  handleReload: () => void
}

/**
 * ErrorPanel component displays error information in a styled panel
 * that matches the dictyBase design system.
 */
const ErrorDisplay = ({
  title = "Sorry, something went wrong.",
  message = "We encountered an error while processing your request.",
  details = "The server encountered an internal error and was unable to complete your request.",
  supportEmail = "dictybase@northwestern.edu",
  handleNavigateHome,
  handleReload,
}: Properties) => (
  <Grid
    container
    direction="column"
    alignItems="stretch"
    spacing={1}
    sx={{
      padding: "2rem",
      paddingLeft: "15rem",
      paddingRight: "15rem",
      backgroundColor: grey[100],
    }}>
    {/* Right Column - Error Details */}
    <Grid item sx={{ alignSelf: "center" }}>
      <Grid container spacing={2}>
        <Grid item>
          <ErrorOutlineIcon sx={{ color: "#004080", fontSize: "4rem" }} />
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
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Paper
        variant="outlined"
        sx={(theme: Theme) => ({
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          padding: 2,
          marginBottom: 3,
        })}>
        <Typography variant="subtitle2" color="InfoText" gutterBottom>
          Error Details
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {details}
        </Typography>
      </Paper>
    </Grid>
    <Grid item>
      <Box
        sx={(theme: Theme) => ({
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          marginBottom: 3,
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
          },
        })}>
        <div>
          <Typography variant="subtitle2" color="infoText" gutterBottom>
            What you can try:
          </Typography>
          <div>
            <Box sx={listItemStyle}>
              <CheckCircleIcon fontSize="small" sx={listIconStyle} />
              <Typography variant="body2">Refresh the page</Typography>
            </Box>
            <Box sx={listItemStyle}>
              <CheckCircleIcon fontSize="small" sx={listIconStyle} />
              <Typography variant="body2">
                Check your internet connection
              </Typography>
            </Box>
            <Box sx={listItemStyle}>
              <CheckCircleIcon fontSize="small" sx={listIconStyle} />
              <Typography variant="body2">Try again later</Typography>
            </Box>
          </div>
        </div>

        <Paper
          variant="outlined"
          sx={(theme: Theme) => ({
            backgroundColor: "#E3F2FD",
            border: "1px solid rgba(0, 64, 128, 0.3)",
            borderRadius: theme.shape.borderRadius,
            padding: 2,
          })}>
          <Typography variant="subtitle2" color="infoText" gutterBottom>
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
      </Box>
    </Grid>
    <Grid item>
      <Box
        sx={(theme: Theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
          },
        })}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#004080",
            color: "common.white",
            "&:hover": {
              backgroundColor: "#003366",
            },
          }}
          onClick={handleReload}
          startIcon={<RefreshIcon sx={buttonIconStyle} />}>
          Refresh Page
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "text.secondary" }}
          onClick={handleNavigateHome}
          startIcon={<HomeIcon sx={buttonIconStyle} />}>
          Return to Homepage
        </Button>
      </Box>
    </Grid>
  </Grid>
)

export { ErrorDisplay }
