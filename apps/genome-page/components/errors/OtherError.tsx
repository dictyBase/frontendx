import React from "react"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ErrorMessage from "./ErrorMessage"
import Image from "next/image"
import useStyles from "../../styles/errorStyles"

/**
 * UI display when there is a general error.
 */

const OtherError = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <Image src="/sadDicty.png" alt="Sad Dicty Logo" layout="fill" />
          <h1>
            <FontAwesomeIcon icon="exclamation-circle" /> Error
          </h1>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export default OtherError
