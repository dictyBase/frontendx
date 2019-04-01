import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import FontAwesome from "react-fontawesome"
import { Publication } from "./PublicationContainer"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "rgb(32, 105, 156)",
  },
})

interface Props extends Publication {
  classes: {
    link: string
  }
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

export const LeftSidebar = (props: Props) => {
  const { classes, data } = props
  return (
    <div>
      <a
        href={data.publication.full_text_url}
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
