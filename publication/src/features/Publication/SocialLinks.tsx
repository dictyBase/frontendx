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

/**
 * SocialLinks contains links to share the publication via social media.
 */

export const SocialLinks = (props: Props) => {
  const { classes } = props
  return <div>Publication SocialLinks</div>
}

export default withStyles(styles)(SocialLinks)
