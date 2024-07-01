import React from "react"
import { Box, Typography } from "@material-ui/core"
import { Publication } from "dicty-graphql-schema"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
import { SocialLinks } from "./SocialLinks"
import { Abstract } from "./Abstract"
import { FullTextLinks } from "./FullTextLinks"
import { parseFormattedStringToDomElements } from "../common/utils/parseFormattedStringToDomElements"

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => {
  const url = `https://doi.org/${publication.doi}`
  return (
    <Box pt={3}>
      <Box pb={2}>
        <Typography variant="h1">
          {parseFormattedStringToDomElements(publication.title)}
        </Typography>
      </Box>

      <Authors authors={publication.authors} />
      <JournalData data={publication} />
      <SocialLinks title={publication.title} />
      <Abstract abstract={publication.abstract} />
      <FullTextLinks url={url} />
    </Box>
  )
}

export { PublicationBody }
