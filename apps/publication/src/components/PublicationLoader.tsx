import React from "react"
import Grid from "@material-ui/core/Grid"
import { Skeleton } from "@mui/material"
import { PublicationHeader } from "./PublicationHeader"
import { useStyles } from "../styles/publicationStyles"

const PublicationLoader = () => {
  const classes = useStyles()

  return (
    <Grid container justify="center" spacing={2} data-testid="skeleton-loader">
      <Grid item xs={12}>
        <PublicationHeader />
      </Grid>
      <Grid item xs={12} sm={2} className={classes.sidebar}>
        <Skeleton variant="text" width="60%" animation="wave" />
        <Skeleton variant="text" width="40%" animation="wave" />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Skeleton variant="text" height="35px" animation="wave" />
        <Skeleton variant="text" width="60%" height="35px" animation="wave" />
        <br />
        <Skeleton variant="text" width="40%" height="25px" animation="wave" />
        <Skeleton variant="text" width="45%" height="25px" animation="wave" />
        <Skeleton variant="text" width="30%" height="25px" animation="wave" />
        <br />
        <br />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <Skeleton variant="text" key={index} animation="wave" />
        ))}
        <Skeleton variant="text" animation="wave" width="80%" />
      </Grid>
    </Grid>
  )
}

export { PublicationLoader }
