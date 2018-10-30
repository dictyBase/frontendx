// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  tableLeftData: {
    backgroundColor: "#e6f2ff",
    minWidth: 150,
    maxWidth: 200,
    fontSize: "1.1em",
    display: "inline",
  },
  innerSpan: {
    height: "100%",
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
  <Grid item xs={3} component="span" className={classes.tableLeftData}>
    <span className={classes.innerSpan}>{title}</span>
  </Grid>
)

export default withStyles(styles)(LeftDisplay)
