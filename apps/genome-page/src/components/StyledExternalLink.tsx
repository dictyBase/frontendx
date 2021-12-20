import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

type Props = {
  /** URL the link points to */
  href: string
  /** Content of the link */
  content: string
}

/**
 * Styled link that opens to a new window.
 */

const StyledExternalLink = ({ href, content }: Props) => {
  const classes = useStyles()

  return (
    <a
      className={classes.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      {content}
    </a>
  )
}

export default StyledExternalLink
