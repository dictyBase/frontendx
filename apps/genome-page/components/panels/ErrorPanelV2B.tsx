import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import RefreshIcon from "@material-ui/icons/Refresh"
import HomeIcon from "@material-ui/icons/Home"
import Link from "next/link"

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
    },
    headerTitle: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 500,
    },
    content: {
      backgroundColor: "#F5F8FA", // Light gray background
      padding: theme.spacing(3),
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
      [theme.breakpoints.up("md")]: {
        margin: 0,
      },
    },
    warningIcon: {
      width: "48px",
      height: "48px",
      color: "#FBC02D", // Yellow warning color
    },
    textAlignCenter: {
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
    },
    errorTitle: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#0A4A88", // Medium blue
      marginBottom: theme.spacing(1.5),
    },
    messageText: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2.5),
    },
    contactBox: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2.5),
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
    buttonGrid: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        "& > div": {
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
          marginBottom: theme.spacing(1.5),
        },
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
      },
    },
    refreshButton: {
      backgroundColor: "#0A4A88", // Medium blue
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: "#003366", // Dark blue
      },
      width: "100%",
    },
    homeButton: {
      width: "100%",
    },
    buttonIcon: {
      marginRight: theme.spacing(0.5),
    },
  }),
)

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
 * that matches the dictyBase design system. This is version 2B with
 * Material-UI Grid layout.
 */
const ErrorPanelV2B = ({
  title = "Sorry, something went wrong.",
  message = "We encountered an unexpected server error while processing your request.",
  supportEmail = "dictybase@northwestern.edu",
}: Properties) => {
  const classes = useStyles()

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className={classes.content}>
      <Grid container spacing={3} alignItems="flex-start">
        {/* Left - Icon */}
        <Grid item xs={12} md={2} container justifyContent="center">
          <div className={classes.iconContainer}>
            <svg
              className={classes.warningIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Grid>

        {/* Right - Content */}
        <Grid item xs={12} md={10} className={classes.textAlignCenter}>
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

          <Grid
            container
            spacing={2}
            className={classes.buttonGrid}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.buttonContainer}
            >
              <Button
                variant="contained"
                className={classes.refreshButton}
                onClick={handleRefresh}
                startIcon={<RefreshIcon className={classes.buttonIcon} />}
                size="medium"
              >
                Refresh Page
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.buttonContainer}
            >
              <Link href="/" passHref>
                <Button
                  variant="outlined"
                  color="default"
                  component="a"
                  className={classes.homeButton}
                  startIcon={<HomeIcon className={classes.buttonIcon} />}
                  size="medium"
                >
                  Return to Homepage
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export { ErrorPanelV2B }
