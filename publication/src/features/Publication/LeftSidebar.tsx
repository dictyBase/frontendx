import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import FontAwesome from "react-fontawesome"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "rgb(32, 105, 156)",
  },
})

interface Props {
  classes: {
    link: string
  }
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

export const LeftSidebar = (props: Props) => {
  const { classes } = props
  return (
    <div>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}>
        Full text &nbsp;
        <FontAwesome name="external-link" />
      </a>
      <br />
      <a href="#" className={classes.link}>
        Get Citation
      </a>
    </div>
  )
}

export default withStyles(styles)(LeftSidebar)
