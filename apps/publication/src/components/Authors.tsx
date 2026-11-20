import React from "react"
import { Grid, Box, Chip } from "@mui/material"
import { blueGrey, lightBlue } from "@mui/material/colors"
import { pipe } from "fp-ts/function"
import { map as Amap, compact as Acompact } from "fp-ts/Array"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import { Author, Maybe } from "dicty-graphql-schema"

interface AuthorsProperties {
  authors: Maybe<Author>[]
}

/**
 * Authors displays an inline list of the authors of the publication.
 */
const Authors = ({ authors }: AuthorsProperties) => (
  <Box mb={1}>
    <Grid container spacing={1}>
      {pipe(
        authors,
        Amap(OfromNullable),
        Acompact,
        Amap(({ initials, last_name }) => (
          <Grid key={`${initials}-${last_name}`} item>
            <Chip
              size="medium"
              label={`${initials} ${last_name}`}
              sx={{
                color: blueGrey[800],
                border: `1px solid ${blueGrey[100]}`,
                backgroundColor: lightBlue[50],
              }}
            />
          </Grid>
        )),
      )}
    </Grid>
  </Box>
)

export { Authors }
