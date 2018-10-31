// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  leftContainer: {
    backgroundColor: "#e6f2ff",
    // minWidth: 150,
    // maxWidth: 300,
    fontSize: "1.1em",
    fontWeight: 400,
    display: "table-cell",
    padding: "4px 56px 4px 24px",
    verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      padding: "2px 8px 2px 8px",
      minWidth: 50,
    },
  },
  innerSpan: {
    height: "100%",
    verticalAlign: "middle",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The title to display for the panel */
  title: string,
}

/**
 * This represents the left side of the inner panel content.
 */

const LeftDisplay = ({ classes, title }: Props) => (
  <Grid item xs={2} component="span" className={classes.leftContainer}>
    <span className={classes.innerSpan}>{title}</span>
  </Grid>
)

export default withStyles(styles)(LeftDisplay)
