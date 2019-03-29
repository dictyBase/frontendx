import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "#020202",
  },
})

interface Props {
  classes: {
    link: string
  }
}

export const LeftSidebar = (props: Props) => {
  const { classes } = props
  return (
    <div>
      <a href="#" className={classes.link}>
        Full text
      </a>
      <br />
      <a href="#" className={classes.link}>
        Get Citation
      </a>
    </div>
  )
}

export default withStyles(styles)(LeftSidebar)
