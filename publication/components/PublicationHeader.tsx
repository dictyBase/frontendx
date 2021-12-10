import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

/**
 * PublicationHeader displays the header at the top of publication pages.
 */

export const PublicationHeader = () => {
  return (
    <Box mt={2} mb={2}>
      <Typography variant="h1" align="center">
        dictyBase Literature
      </Typography>
    </Box>
  )
}

export default PublicationHeader
