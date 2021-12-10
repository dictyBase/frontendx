import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import CallMadeIcon from "@mui/icons-material/CallMade"

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
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Box pt={2} pb={2} display="flex">
          Read article at publisher's site
          <CallMadeIcon
            sx={{ marginLeft: "7px", width: "0.7em", height: "0.7em" }}
          />
        </Box>
      </a>
    </Box>
  )
}

export default FullTextLinks
