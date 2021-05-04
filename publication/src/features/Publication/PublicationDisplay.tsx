import React from "react"
import Title from "./Sections/Title"
import Authors from "./Sections/Authors"
import JournalData from "./Sections/JournalData"
import SocialLinks from "./Sections/SocialLinks"
import Abstract from "./Sections/Abstract"
import FullTextLinks from "./Sections/FullTextLinks"
import { Author, Publication } from "dicty-graphql-schema"

type Props = {
  data: Publication
}

export const PublicationDisplay = ({ data }: Props) => {
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
    <React.Fragment>
      <Title title={title} />
      <Authors authors={authors} />
      <JournalData data={journalData} />
      <SocialLinks title={title} />
      <Abstract abstract={abstract} />
      <FullTextLinks url={url} />
    </React.Fragment>
  )
}

export default PublicationDisplay
