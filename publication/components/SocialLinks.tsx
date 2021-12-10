import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles((theme: Theme) => ({
  email: {
    color: "#0059b3",
  },
  tweet: {
    color: "#1da1f2",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}))

type Props = {
  title: string
}

/**
 * SocialLinks contains links to share the publication via social media.
 */

export const SocialLinks = ({ title }: Props) => {
  const classes = useStyles()
  const url = window.location.href

  return (
    <Box>
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
    </Box>
  )
}

export default SocialLinks
