import React from "react"
import Grid from "@material-ui/core/Grid"
import ErrorMessage from "./ErrorMessage"
import useStyles from "../../styles/errorStyles"
import Image from "next/image"

type Props = {
  /** Error message to display*/
  error: string
}

/**
 * UI display when an item was not found.
 */

const NotFoundError = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <Image src="/sadDicty.png" alt="Sad Dicty Logo" layout="fill" />
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

export default NotFoundError
