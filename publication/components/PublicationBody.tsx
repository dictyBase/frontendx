import React from "react"
import { Box, Typography } from "@material-ui/core"
import Authors from "components/Authors"
import JournalData from "components/JournalData"
import SocialLinks from "components/SocialLinks"
import Abstract from "components/Abstract"
import FullTextLinks from "components/FullTextLinks"
import { Publication } from "dicty-graphql-schema"

interface PublicationBodyProps {
  publication: Publication
}

export const PublicationBody = ({ publication }: PublicationBodyProps) => {
  const url = `https://doi.org/${publication.doi}`

  return (
    <Box pt={3}>
      <Box pb={2}>
        <Typography variant="h1">
          <b>{publication.title}</b>
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

export default PublicationBody
