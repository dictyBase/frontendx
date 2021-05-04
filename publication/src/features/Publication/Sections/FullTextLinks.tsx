import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  url: string
}

/**
 * FullTextLinks displays links to the full text of the publication.
 */

export const FullTextLinks = ({ url }: Props) => {
  return (
    <Box pb={2}>
      <Typography variant="h2">Full Text Links</Typography>
      <Divider />
      <Box pt={2} pb={2}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read article at publisher's site &nbsp;
          <FontAwesomeIcon icon="external-link-alt" />
        </a>
      </Box>
    </Box>
  )
}

export default FullTextLinks
