import React from "react"
import Box from "@material-ui/core/Box"
import { Author, Maybe } from "dicty-graphql-schema"

interface AuthorsProperties {
  authors: Maybe<Author>[]
}

/**
 * Authors displays an inline list of the authors of the publication.
 */
const Authors = ({ authors }: AuthorsProperties) => (
  <Box pb={2}>
    {authors.map((author, index) => (
      <span key={index}>
        {`${(index ? ", " : "") + author?.last_name} ${author?.initials}`}
      </span>
    ))}
  </Box>
)

export default Authors
