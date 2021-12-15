import React from "react"
import { Box, Typography } from "@material-ui/core"
import Authors from "components/Authors"
import JournalData from "components/JournalData"
import SocialLinks from "components/SocialLinks"
import Abstract from "components/Abstract"
import FullTextLinks from "components/FullTextLinks"
import { Author, Publication } from "dicty-graphql-schema"

interface PublicationBodyProps {
  publication: Publication
}

export const PublicationBody = ({ publication }: PublicationBodyProps) => {
  const url = `https://doi.org/${publication.doi}`
  const authors = publication.authors as Author[]

  return (
    <Box pt={3}>
      <Box pb={2}>
        <Typography variant="h1">
          <b>{publication.title}</b>
        </Typography>
      </Box>

      <Authors authors={authors} />
      <JournalData data={publication} />
      <SocialLinks title={publication.title} />
      <Abstract abstract={publication.abstract} />
      <FullTextLinks url={url} />
    </Box>
  )
}

export default PublicationBody
