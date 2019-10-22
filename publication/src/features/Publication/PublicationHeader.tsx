import React from "react"
import Grid from "@material-ui/core/Grid"
import useStyles from "./publicationStyles"

/**
 * PublicationHeader displays the header at the top of publication pages.
 */

export const PublicationHeader = () => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <h1 className={classes.title}>dictyBase Literature</h1>
    </Grid>
  )
}

export default PublicationHeader
