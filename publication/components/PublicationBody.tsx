import React from "react"
import { Box, Typography } from "@material-ui/core"
import Authors from "components/Authors"
import JournalData from "components/JournalData"
import SocialLinks from "components/SocialLinks"
import Abstract from "components/Abstract"
import FullTextLinks from "components/FullTextLinks"
import { Author, Publication } from "dicty-graphql-schema"

type Props = {
  data: Publication
}

export const PublicationBody = ({ data }: Props) => {
  const journalData = {
    id: data.id as string,
    doi: data.doi as string,
    journal: data.journal as string,
    pages: data.pages as string,
    pub_date: data.pub_date as string,
    issue: data.issue as string,
    volume: data.volume as string,
  }
  const url = `https://doi.org/${data.doi}`

  const title = data.title as string
  const authors = data.authors as Author[]
  const abstract = data.abstract as string

  return (
    <Box pt={3}>
      <Box pb={2}>
        <Typography variant="h1">
          <b>{title}</b>
        </Typography>
      </Box>

      <Authors authors={authors} />
      <JournalData data={journalData} />
      <SocialLinks title={title} />
      <Abstract abstract={abstract} />
      <FullTextLinks url={url} />
    </Box>
  )
}

export default PublicationBody
