import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import RefreshIcon from "@material-ui/icons/Refresh"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "800px",
      margin: "32px auto",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      overflow: "hidden",
    },
    header: {
      backgroundColor: "#003366", // Dark blue color
      color: theme.palette.common.white,
      padding: theme.spacing(1.5, 2),
      textAlign: "center",
    },
    headerTitle: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 500,
    },
    content: {
      backgroundColor: "#F5F8FA", // Light gray background
      padding: theme.spacing(3),
    },
    gridContainer: {
      display: "flex",
      justifyContent: "center",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "80px",
      height: "80px",
      backgroundColor: "#FFF9C4", // Light yellow background
      borderRadius: "50%",
      border: "2px solid #FBC02D", // Yellow border
      margin: "0 auto",
    },
    warningIcon: {
      width: "48px",
      height: "48px",
      color: "#FBC02D", // Yellow warning color
    },
    contentWrapper: {
      maxWidth: "500px",
      margin: "0 auto",
    },
    textCenter: {
      textAlign: "center",
    },
    errorTitle: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#0A4A88", // Medium blue
      marginBottom: theme.spacing(1.5),
      textAlign: "center",
    },
    messageText: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2.5),
      textAlign: "center",
    },
    contactBox: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2.5),
      textAlign: "center",
    },
    emailText: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
    },
    emailLink: {
      color: "#0A4A88", // Medium blue
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        gap: theme.spacing(1.5),
      },
    },
    refreshButton: {
      backgroundColor: "#0A4A88", // Medium blue
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: "#003366", // Dark blue
      },
      minWidth: "160px",
    },
    homeButton: {
      minWidth: "160px",
    },
    buttonIcon: {
      marginRight: theme.spacing(0.5),
    },
  }),
)

const handleRefresh = () => {
  window.location.reload()
}

type Properties = {
  /** Title of the error panel */
  title?: string
  /** Main error message to display */
  message?: string
  /** Email address for support contact */
  supportEmail?: string
}

/**
 * ErrorPanelV2B component displays error information in a simplified panel
 * that matches the dictyBase design system. This version uses centered layout.
 */
const ErrorPanelV2B = ({
  title = "Sorry, something went wrong.",
  message = "We encountered an unexpected server error while processing your request.",
  supportEmail = "dictybase@northwestern.edu",
}: Properties) => {
  const classes = useStyles()

  return (
    <div className={classes.content}>
      <Grid container direction="column" spacing={3} alignItems="center">
        {/* Content */}
        <Grid item xs={12} className={classes.contentWrapper}>
          <Typography variant="h3" className={classes.errorTitle}>
            {title}
          </Typography>

          <Typography variant="body1" className={classes.messageText}>
            {message}
          </Typography>

          <Paper variant="outlined" className={classes.contactBox}>
            <Typography variant="body2" className={classes.emailText}>
              If this problem persists, please email us at{" "}
              <a href={`mailto:${supportEmail}`} className={classes.emailLink}>
                {supportEmail}
              </a>
            </Typography>
          </Paper>

          <Box className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.refreshButton}
              onClick={handleRefresh}
              startIcon={<RefreshIcon className={classes.buttonIcon} />}
              size="medium">
              Refresh Page
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export { ErrorPanelV2B }
