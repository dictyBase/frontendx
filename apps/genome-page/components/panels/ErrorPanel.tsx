import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import RefreshIcon from "@material-ui/icons/Refresh"
import HomeIcon from "@material-ui/icons/Home"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Image from "next/image"
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: "normal",
      color: "#fff",
    },
    summary: {
      backgroundColor: "#004080", // Using the theme primary color
      marginTop: "0px",
    },
    icon: {
      color: "#fff",
    },
    details: {
      padding: 0,
      backgroundColor: "#F5F8FA",
    },
    innerContent: {
      width: "100%",
    },
    logoContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRight: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        borderRight: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "96px",
      height: "96px",
      backgroundColor: "#FFF9C4", // Light yellow background
      borderRadius: "50%",
      border: "2px solid #FBC02D", // Yellow border
      marginTop: theme.spacing(3),
    },
    warningIcon: {
      width: "64px",
      height: "64px",
      color: "#FBC02D", // Yellow warning color
    },
    detailsContainer: {
      padding: theme.spacing(3),
    },
    errorTitle: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#004080",
      marginBottom: theme.spacing(2),
    },
    errorBox: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    helpSection: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
      },
    },
    infoBox: {
      backgroundColor: "#E3F2FD", // Light blue background
      border: "1px solid rgba(0, 64, 128, 0.3)",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
    },
    listItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: theme.spacing(1),
    },
    listIcon: {
      color: "#004080",
      marginRight: theme.spacing(1),
      marginTop: "2px",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1.5),
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
    },
    refreshButton: {
      backgroundColor: "#004080",
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: "#003366",
      },
    },
    homeButton: {
      color: theme.palette.text.secondary,
    },
    buttonIcon: {
      marginRight: theme.spacing(1),
    },
    emailLink: {
      color: "#004080",
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }),
)

type Properties = {
  /** Title of the error panel */
  title?: string
  /** Main error message to display */
  message?: string
  /** Detailed error information */
  details?: string
  /** Email address for support contact */
  supportEmail?: string
}

/**
 * ErrorPanel component displays error information in a styled panel
 * that matches the dictyBase design system.
 */
const ErrorPanel = ({
  title = "Sorry, something went wrong.",
  message = "We encountered an unexpected server error while processing your request. Our technical team has been notified.",
  details = "The server encountered an internal error and was unable to complete your request.",
  supportEmail = "dictybase@northwestern.edu",
}: Properties) => {
  const classes = useStyles()

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <div className={classes.innerContent}>
        <Grid container>
          {/* Left Column - Logo and Icon */}
          <Grid item xs={12} md={4} className={classes.logoContainer}>
            <Image
              src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
              alt="Sad Dicty"
              height="300"
              width="300"
              objectFit="contain"
              onError={() => {
                // Fallback handled by next/image
              }}
            />
          </Grid>

          {/* Right Column - Error Details */}
          <Grid item xs={12} md={8} className={classes.detailsContainer}>
            <Typography variant="h3" className={classes.errorTitle}>
              {title}
            </Typography>

            <Typography variant="body1" color="textSecondary" paragraph>
              {message}
            </Typography>

            <Paper variant="outlined" className={classes.errorBox}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Error Details
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {details}
              </Typography>
            </Paper>

            <div className={classes.helpSection}>
              <div>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  What you can try:
                </Typography>
                <div>
                  <div className={classes.listItem}>
                    <CheckCircleIcon
                      fontSize="small"
                      className={classes.listIcon}
                    />
                    <Typography variant="body2">Refresh the page</Typography>
                  </div>
                  <div className={classes.listItem}>
                    <CheckCircleIcon
                      fontSize="small"
                      className={classes.listIcon}
                    />
                    <Typography variant="body2">
                      Check your internet connection
                    </Typography>
                  </div>
                  <div className={classes.listItem}>
                    <CheckCircleIcon
                      fontSize="small"
                      className={classes.listIcon}
                    />
                    <Typography variant="body2">Try again later</Typography>
                  </div>
                </div>
              </div>

              <Paper variant="outlined" className={classes.infoBox}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Need assistance?
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  If this problem persists, please email us at:
                </Typography>
                <a
                  href={`mailto:${supportEmail}`}
                  className={classes.emailLink}
                >
                  {supportEmail}
                </a>
              </Paper>
            </div>

            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.refreshButton}
                onClick={handleRefresh}
                startIcon={<RefreshIcon className={classes.buttonIcon} />}
              >
                Refresh Page
              </Button>
              <Link href="/">
                <Button
                  variant="outlined"
                  className={classes.homeButton}
                  startIcon={<HomeIcon className={classes.buttonIcon} />}
                >
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export { ErrorPanel }
