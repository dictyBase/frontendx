import React from "react"
import Grid from "@material-ui/core/Grid"
import Skeleton from "react-loading-skeleton"
import { withStyles } from "@material-ui/core/styles"
import styles from "./publicationStyles"

interface Props {
  classes: {
    layout: string
    title: string
    sidebar: string
  }
}

export const PublicationLoader = ({ classes }: Props) => {
  return (
    <Grid container spacing={2} className={classes.layout}>
      <Grid item xs={12}>
        <h1 className={classes.title}>dictyBase Literature</h1>
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

export default withStyles(styles)(PublicationLoader)
