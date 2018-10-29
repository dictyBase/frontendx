// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"

const styles = theme => ({
  tableLeftData: {
    backgroundColor: "#e6f2ff",
    minWidth: 150,
    maxWidth: 200,
    fontSize: "1.1em",
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

const PanelListItemLeft = ({ classes, title }: Props) => (
  <TableCell component="th" scope="row" className={classes.tableLeftData}>
    {title}
  </TableCell>
)

export default withStyles(styles)(PanelListItemLeft)
