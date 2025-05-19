import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import RefreshIcon from "@material-ui/icons/Refresh"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2rem",
      backgroundColor: grey[100],
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
      color: theme.palette.primary.main,
      fontSize: "4rem",
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
    errorTitle: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#004080",
      marginBottom: theme.spacing(2),
    },
    errorBox: {
      height: "100%",
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
      height: "100%",
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
  const classes = useStyles()

  const handleRefresh = () => {
    retry()
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      className={classes.root}
      spacing={1}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <ErrorOutlineIcon className={classes.icon} />
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.errorTitle}>
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
            <Paper variant="outlined" className={classes.errorBox}>
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
                    className={classes.refreshButton}
                    onClick={handleRefresh}
                    startIcon={<RefreshIcon className={classes.buttonIcon} />}>
                    Retry
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" className={classes.infoBox}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Need assistance?
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                If this problem persists, please email us at:
              </Typography>
              <a href={`mailto:${supportEmail}`} className={classes.emailLink}>
                {supportEmail}
              </a>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { ErrorPanel }
