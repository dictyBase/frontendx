import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"

const styles = createStyles({
  root: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
  },
})

interface Props {
  classes: {
    root: string
    title: string
  }
}

export const PublicationContainer = (props: Props) => {
  const { classes } = props
  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <h1 className={classes.title}>dictyBase Literature</h1>
      </Grid>
      <Grid item xs={3}>
        <LeftSidebar />
      </Grid>
      <Grid item xs={9}>
        <PublicationDisplay />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PublicationContainer)
