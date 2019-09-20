// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { makeStyles } from "@material-ui/core/styles"
import InfoIcon from "@material-ui/icons/Info"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#a8a8a8",
    marginBottom: "20px",
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    paddingRight: "5px",
  },
  message: {
    padding: 0,
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#4C5E81",
  },
}))

type Props = {
  id: string,
}

const LegacyLinkSnackbar = ({ id }: Props) => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={10}>
        <SnackbarContent
          className={classes.root}
          classes={{ message: classes.message }}
          aria-describedby="legacy-link-snackbar"
          message={
            <span id="legacy-link-snackbar" className={classes.content}>
              <InfoIcon className={classes.icon} />
              <p>
                This gene page is a work in progress as we transition to our new
                database. We are continuously adding data to these pages, but in
                the meantime you can visit our{" "}
                <a
                  href={`http://dictybase.org/gene/${id}`}
                  className={classes.link}>
                  legacy page
                </a>{" "}
                for more detailed information about this gene.
              </p>
            </span>
          }
        />
      </Grid>
    </Grid>
  )
}

export default LegacyLinkSnackbar
