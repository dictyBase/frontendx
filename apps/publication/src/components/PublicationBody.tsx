import React from "react"
import { Box, Typography } from "@mui/material"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
import { Abstract } from "./Abstract"

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => (
  <Box sx={{ padding: 3 }}>
    <Box mb={2}>
      <Typography
        variant="h1"
        sx={{ fontFamily: "'Playfair Display Variable', serif" }}>
        {parseFormattedStringToDomElements(publication.title)}
      </Typography>
    </Box>
    <Authors authors={publication.authors} />
    <JournalData data={publication} />
    <Abstract abstract={publication.abstract} />
  </Box>
)

export { PublicationBody }
