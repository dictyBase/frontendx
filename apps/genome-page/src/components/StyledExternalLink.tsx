import Box from "@mui/material/Box"

type Properties = {
  /** URL the link points to */
  href: string
  /** Content of the link */
  content: string
}

/**
 * Styled link that opens to a new window.
 */

const StyledExternalLink = ({ href, content }: Properties) => (
  <Box
    component="a"
    sx={{
      textDecoration: "none",
      color: "#4C5E81",
      "&:visited": {
        color: "#4C5E81",
      },
      "&:hover": {
        textDecoration: "underline",
      },
    }}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    {content}
  </Box>
)

export { StyledExternalLink }
