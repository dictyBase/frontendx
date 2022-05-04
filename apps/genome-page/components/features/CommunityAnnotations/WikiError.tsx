import React from "react"
import Grid from "@material-ui/core/Grid"
import useStyles from "../../../styles/errorStyles"
import Image from "next/image"

type Props = {
  /** Error message to display*/
  error: string
}

/**
 * UI display when an item was not found.
 */

const WikiError = ({ error }: Props) => {
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
          <h3>{error}</h3>
          <h4>
            {"Be the first to contribute "}{" "}
            <a href="https://github.com/dictyBase/community-annotations/wiki">
              here
            </a>
          </h4>
        </div>
      </Grid>
    </Grid>
  )
}

export default WikiError
