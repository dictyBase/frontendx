// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  container: {
    float: "left",
  },
})

/**
 * Wrapper component for each item inside panel
 */

const ItemDisplay = ({ children, classes }) => (
  <Grid className={classes.container} container>
    {children}
  </Grid>
)

export default withStyles(styles)(ItemDisplay)
