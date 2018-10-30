// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  tableRightData: {
    width: "80%",
    height: "100%",
    display: "inline",
  },
  innerSpan: {
    height: "100%",
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
  <Grid item xs={9} component="span" className={classes.tableRightData}>
    <span className={classes.innerSpan}>{children}</span>
  </Grid>
)

export default withStyles(styles)(RightDisplay)
