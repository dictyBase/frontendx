import React from "react"
import { makeStyles, Card, Box, Typography } from "@material-ui/core"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
import { Abstract } from "./Abstract"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  title: {
    fontFamily: "'Playfair Display Variable', serif",
  },
  body: {
    fontFamily: "'Inter Variable', sans-serif",
  },
}))

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => {
  const classes = useStyles()
  return (
      <Box className={classes.container}>
        <Box mb={2}>
          <Typography variant="h1" className={classes.title}>
            {parseFormattedStringToDomElements(publication.title)}
          </Typography>
        </Box>
        <Authors authors={publication.authors} />
        <JournalData data={publication} />
        <Abstract abstract={publication.abstract} />
      </Box>
  )
}

export { PublicationBody }
