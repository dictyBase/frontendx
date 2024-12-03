import React from "react"
import { makeStyles, Grid, Chip, Box } from "@material-ui/core"
import { blueGrey, lightBlue, orange } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { map as Amap, compact as Acompact } from "fp-ts/Array"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import { Author, Maybe } from "dicty-graphql-schema"

interface AuthorsProperties {
  authors: Maybe<Author>[]
}

const useStyles = makeStyles({
  chip: {
    color: blueGrey[800],
    border: `1px solid ${blueGrey[100]}`,
    backgroundColor: lightBlue[50],
  },
})
/**
 * Authors displays an inline list of the authors of the publication.
 */
const Authors = ({ authors }: AuthorsProperties) => {
  const classes = useStyles()
  return (
    <Box mb={1}>
      <Grid container spacing={1}>
        {pipe(
          authors,
          Amap(OfromNullable),
          Acompact,
          Amap(({ initials, last_name }) => (
            <Grid item>
              <Chip
                size="medium"
                label={`${initials} ${last_name}`}
                className={classes.chip}
              />
            </Grid>
          )),
        )}
      </Grid>
    </Box>
  )
}

export { Authors }
