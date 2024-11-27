import React from "react"
import { makeStyles, Box, Typography, Divider } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
import { Abstract } from "./Abstract"

const useStyles = makeStyles({
  titleContainer: {
    // backgroundColor: blue[900],
  },
  title: {
    // color: blue[50],
    fontFamily: "'Playfair Display Variable', serif",
  },
  body: {
    fontFamily: "'Inter Variable', sans-serif",
  },
})

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => {
  const classes = useStyles()
  const url = `https://doi.org/${publication.doi}`
  return (
    <Box>
      <Box mb={2} className={classes.titleContainer}>
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
