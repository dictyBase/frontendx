import React from "react"
import Grid from "@material-ui/core/Grid"
import Skeleton from "react-loading-skeleton"
import PublicationHeader from "./PublicationHeader"
import useStyles from "./publicationStyles"

export const PublicationLoader = () => {
  const classes = useStyles()

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <PublicationHeader />
      </Grid>
      <Grid item xs={3} className={classes.sidebar}>
        <Skeleton count={5} />
      </Grid>
      <Grid item xs={9}>
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
      </Grid>
    </Grid>
  )
}

export default PublicationLoader
