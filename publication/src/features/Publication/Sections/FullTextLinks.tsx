import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const styles = createStyles({
  section: {
    paddingBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#0059b3",
  },
  content: {
    paddingTop: "10px",
  },
})

interface Props {
  classes: {
    section: string
    link: string
    content: string
  }
  url: string
}

/**
 * FullTextLinks displays links to the full text of the publication.
 */

export const FullTextLinks = (props: Props) => {
  const { classes, url } = props

  return (
    <div className={classes.section}>
      <h3>Full Text Links</h3>
      <hr />
      <div className={classes.content}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          Read article at publisher's site &nbsp;
          <FontAwesomeIcon icon="external-link-alt" />
        </a>
      </div>
    </div>
  )
}

export default withStyles(styles)(FullTextLinks)
