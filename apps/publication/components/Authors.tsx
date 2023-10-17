import React from "react"
import Box from "@material-ui/core/Box"
import { Author, Maybe } from "dicty-graphql-schema"

interface AuthorsProps {
  authors: Maybe<Author>[]
}

/**
 * Authors displays an inline list of the authors of the publication.
 */
const Authors = ({ authors }: AuthorsProps) => {
  return (
    <Box pb={2}>
      {authors.map((author, index) => (
        <span key={index}>
          {(index ? ", " : "") + author?.last_name + " " + author?.initials}
        </span>
      ))}
    </Box>
  )
}

export default Authors
