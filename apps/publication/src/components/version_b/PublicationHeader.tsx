import React from "react"
import { makeStyles, Box, Typography } from "@material-ui/core"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"

const useStyles = makeStyles({
  title: {
    fontFamily: "'Playfair Display Variable', serif",
  },
})

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationHeader = ({ publication }: PublicationBodyProperties) => {
  const classes = useStyles()
  return (
    <Box mt={2}>
      <Box mb={2}>
        <Typography variant="h1" className={classes.title}>
          {parseFormattedStringToDomElements(publication.title)}
        </Typography>
      </Box>
      <Authors authors={publication.authors} />
      <JournalData data={publication} />
    </Box>
  )
}

export { PublicationHeader }
