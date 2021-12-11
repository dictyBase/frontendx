import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

type Props = {
  title: string
}

/**
 * Title displays the title of the publication.
 */

export const Title = ({ title }: Props) => {
  return (
    <Box pb={2}>
      <Typography variant="h1">
        <b>{title}</b>
      </Typography>
    </Box>
  )
}

export default Title
