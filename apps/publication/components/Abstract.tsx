import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

type Props = {
  abstract: string
}

/**
 * Displays the abstract of the publication.
 */
export const Abstract = ({ abstract }: Props) => {
  const body =
    abstract === "" ? (
      <></>
    ) : (
      <>
        <Typography variant="h2">Abstract</Typography>
        <Divider />
        <Box pt={2} pb={2}>
          {abstract}
        </Box>
      </>
    )

  return (
    <Box pt={2} pb={1}>
      {body}
    </Box>
  )
}

export default Abstract
