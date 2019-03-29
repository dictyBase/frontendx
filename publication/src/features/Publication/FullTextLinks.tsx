import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import FontAwesome from "react-fontawesome"

const styles = createStyles({
  section: {
    paddingBottom: "5px",
  },
  link: {
    textDecoration: "none",
    color: "rgb(32, 105, 156);",
  },
})

interface Props {
  classes: {
    section: string
    link: string
  }
}

const url = "http://www.zombo.com"

/**
 * FullTextLinks displays links to the full text of the publication.
 */

export const FullTextLinks = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.section}>
      <h3>Full Text Links</h3>
      <hr />
      <span>
        {" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          Read article at publisher's site &nbsp;
          <FontAwesome name="external-link" />
        </a>
      </span>
    </div>
  )
}

export default withStyles(styles)(FullTextLinks)
