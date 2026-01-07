import { ApolloError } from "@apollo/client"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import { getOrElse as OgetOrElse, map as Omap } from "fp-ts/Option"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Theme } from "@mui/material/styles";
import { makeStyles } from 'tss-react/mui';
import createStyles from '@mui/styles/createStyles';
import Button from "@mui/material/Button"
import RefreshIcon from "@mui/icons-material/Refresh"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { grey } from "@mui/material/colors"

const errorStyles = makeStyles()((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6),
      backgroundColor: grey[100],
      height: "100%",
    },
    heading: {
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
      [theme.breakpoints.down('md')]: {
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
    },
    helpSection: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
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
  }));
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
  const { classes } = errorStyles()

  const handleRetry = () => {
    refetch()
  }
  return (
    <Paper className={classes.root}>
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <ErrorOutlineIcon className={classes.icon} />
            </Grid>
            <Grid item>
              <Typography variant="h2" className={classes.errorTitle}>
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
              <Paper variant="outlined" className={classes.errorBox}>
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
                  <Paper variant="outlined" className={classes.infoBox}>
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
                          className={classes.refreshButton}
                          onClick={handleRetry}
                          startIcon={
                            <RefreshIcon className={classes.buttonIcon} />
                          }>
                          Retry
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" className={classes.infoBox}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom>
                      Need assistance?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      If this problem persists, please email us at:
                    </Typography>
                    <a
                      href={`mailto:${supportEmail}`}
                      className={classes.emailLink}>
                      {supportEmail}
                    </a>
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
