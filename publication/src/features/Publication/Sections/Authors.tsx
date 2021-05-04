import React from "react"
import Box from "@material-ui/core/Box"
import { Author } from "dicty-graphql-schema"

type Props = {
  authors: Author[]
}

/**
 * Authors displays an inline list of the authors of the publication.
 */
const Authors = ({ authors }: Props) => {
  return (
    <Box pb={2}>
      {authors.map((author, index) => (
        <span key={index}>
          {(index ? ", " : "") + author.last_name + " " + author.initials}
        </span>
      ))}
    </Box>
  )
}

export default Authors
