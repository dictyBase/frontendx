// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  rightContainer: {
    width: "80%",
    height: "100%",
    display: "table-cell",
    padding: "4px 56px 4px 24px",
    verticalAlign: "middle",
  },
  innerSpan: {
    height: "100%",
    fontSize: "0.8125rem",
    fontWeight: 400,
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The content to display inside this cell */
  children: any,
}

/**
 * This represents the right side of the inner panel content.
 * It acts as a wrapper around whatever children it receives.
 */

const RightDisplay = ({ classes, children }: Props) => (
  <Grid item xs={10} component="span" className={classes.rightContainer}>
    <span className={classes.innerSpan}>{children}</span>
  </Grid>
)

export default withStyles(styles)(RightDisplay)
