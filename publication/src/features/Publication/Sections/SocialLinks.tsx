import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const styles = createStyles({
  email: {
    color: "#0059b3",
  },
  tweet: {
    color: "#1da1f2",
    paddingRight: "5px",
  },
})

interface Props {
  classes: {
    email: string
    tweet: string
  }
  title: string
}

/**
 * SocialLinks contains links to share the publication via social media.
 */

export const SocialLinks = ({ classes, title }: Props) => {
  const url = window.location.href

  return (
    <div>
      <strong>Share this article</strong>&nbsp;
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.tweet}>
        <FontAwesomeIcon
          icon={["fab", "twitter"]}
          title="Share article on Twitter"
        />
      </a>
      <a
        href={`mailto:?subject=${title}&body=I thought you might find this article interesting: ${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.email}>
        <FontAwesomeIcon icon="envelope" title="Email this article" />
      </a>
    </div>
  )
}

export default withStyles(styles)(SocialLinks)
