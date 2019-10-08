import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sadDicty from "../assets/sad-dicty.png"

const styles = (theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: "#eff8fb",
      textAlign: "center",
      paddingTop: 30,
      paddingBottom: 30,
      marginBottom: 30,
      borderRadius: 5,
    },
    backButton: {
      width: "25%",
      padding: "20px",
      textTransform: "none",
      backgroundColor: "#15317e",
      color: "#e3e3e3",
      "&:hover": {
        backgroundColor: "#1a3d9e",
      },
    },
    mainGrid: {
      marginTop: "40px",
    },

    link: {
      color: "#428bca",
      textDecoration: "none",
    },
  })

interface Props {
  /** Material-UI styling */
  classes: {
    mainGrid: string
    error: string
    backButton: string
    link: string
  }
  error: object
}

/**
 * General error handling page. It displays different messages based on HTTP status code.
 */

export const ErrorPage = (props: Props) => {
  const { classes, error } = props

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error}>
          <img src={sadDicty} alt="Sad Dicty -- HTTP Error" />
          <h1>
            <FontAwesomeIcon icon="exclamation-circle" /> Error
          </h1>
          <h3>{error.toString()}</h3>
          <p>
            If the problem persists, please email us at{" "}
            <a
              className={classes.link}
              href="mailto:dictybase@northwestern.edu">
              dictybase@northwestern.edu
            </a>
            .
          </p>
          <a href="/">
            <Button
              className={classes.backButton}
              size="small"
              variant="contained"
              color="primary">
              Back to Homepage
            </Button>
          </a>
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ErrorPage)
