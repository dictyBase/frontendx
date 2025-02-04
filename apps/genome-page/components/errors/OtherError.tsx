import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Image from "next/image"
import { ErrorMessage } from "./ErrorMessage"
import { useStyles } from "../../styles/errorStyles"

/**
 * UI display when there is a general error.
 */

const OtherError = () => {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <Image
            src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
            alt="Sad Dicty Logo"
            width="350px"
            height="200%"
          />
          <Typography variant="h2"> Sorry, something went wrong. </Typography>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { OtherError }
