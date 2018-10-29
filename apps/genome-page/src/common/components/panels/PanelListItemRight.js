// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"

const styles = theme => ({
  tableRightData: {
    width: "80%",
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

const PanelListItemRight = ({ classes, children }: Props) => (
  <TableCell className={classes.tableRightData}>{children}</TableCell>
)

export default withStyles(styles)(PanelListItemRight)
