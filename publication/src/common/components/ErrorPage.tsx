import React from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FontAwesome from "react-fontawesome"
import sadDicty from "../assets/sad-dicty.png"

const styles = (theme: Theme) =>
  createStyles({
    error400: {
      backgroundColor: "#eff8fb",
      textAlign: "center",
      paddingTop: 30,
      paddingBottom: 30,
      marginBottom: 30,
      borderRadius: 5,
    },
    error500: {
      backgroundColor: "#a63232",
      textAlign: "center",
      paddingTop: 40,
      paddingBottom: 40,
      marginBottom: 30,
      borderRadius: 5,
      color: "#e3e3e3",
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
    paragraph: {
      padding: "10px",
    },
    link: {
      color: "#428bca",
      textDecoration: "none",
    },
    link500: {
      color: "#e0e0e0",
      textDecoration: "none",
    },
    list: {
      margin: "0 auto",
      display: "table",
    },
  })

interface Props {
  /** Material-UI styling */
  classes: {
    mainGrid: string
    link500: string
    error500: string
    backButton: string
    list: string
    error400: string
    link: string
    paragraph: string
  }
  error: object
}

/**
 * General error handling page. It displays different messages based on HTTP status code.
 */

export const ErrorPage = (props: Props) => {
  const { classes, error } = props

  console.log(error)

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img src={sadDicty} alt="Sad Dicty -- HTTP Error" />
          <h1>
            <FontAwesome name="exclamation-circle" /> Error
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
