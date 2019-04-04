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

export const SocialLinks = (props: Props) => {
  const { classes, title } = props
  const url = window.location.href
  const tweetURL = `https://twitter.com/intent/tweet?url=${url}`
  const email = `mailto:?subject=${title}&body=I thought you might find this article interesting: ${url}`

  return (
    <div>
      <span>
        <strong>Share this article</strong>&nbsp;
        <a
          href={tweetURL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.tweet}>
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a
          href={email}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.email}>
          <FontAwesomeIcon icon="envelope" />
        </a>
      </span>
    </div>
  )
}

export default withStyles(styles)(SocialLinks)
