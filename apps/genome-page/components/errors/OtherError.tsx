import React from "react"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import ErrorMessage from "./ErrorMessage"
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
          <Image
            src="/sad-dicty.png"
            alt="Sad Dicty Logo"
            width="350px"
            height="200%"
          />
          <h1>
            <FontAwesomeIcon icon="exclamation-circle" /> Error
          </h1>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { OtherError }
