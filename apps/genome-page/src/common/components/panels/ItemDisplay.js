import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = (theme) => ({
  container: {
    borderBottom: "1px dotted #A3BAE9",
    display: "table",
    height: "48px",
  },
})

/**
 * Wrapper component for each item inside panel
 */

const ItemDisplay = ({ children, classes }) => (
  <Grid container className={classes.container}>
    {children}
  </Grid>
)

export default withStyles(styles)(ItemDisplay)
