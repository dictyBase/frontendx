import React from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Image from "next/image"
import { ErrorMessage } from "./ErrorMessage"
import { useStyles } from "../../styles/errorStyles"

type Properties = {
  /** Error message to display */
  error: string
}

/**
 * UI display when an item was not found.
 */

const NotFoundError = ({ error }: Properties) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
    <Grid container justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <Image
            src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
            alt="Sad Dicty Logo"
            width="350px"
            height="200%"
          />
          <h3>{error}</h3>
          <div className={classes.list}>
            <ul>
              <li>This is probably an invalid ID. Try a different one.</li>
              <li>You might be coming here from an outdated link.</li>
            </ul>
          </div>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { NotFoundError }
