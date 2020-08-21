import React from "react"
import Title from "./Sections/Title"
import Authors from "./Sections/Authors"
import JournalData from "./Sections/JournalData"
import SocialLinks from "./Sections/SocialLinks"
import Abstract from "./Sections/Abstract"
import FullTextLinks from "./Sections/FullTextLinks"
import { Publication } from "common/@types/publication"

interface Props extends Publication {}

export const PublicationDisplay = ({ data }: Props) => {
  const journalData = {
    id: data.publication.id,
    doi: data.publication.doi,
    journal: data.publication.journal,
    pages: data.publication.pages,
    pub_date: data.publication.pub_date,
    issue: data.publication.issue,
    volume: data.publication.volume,
  }
  const url = `https://doi.org/${data.publication.doi}`

  return (
    <>
      <Title title={data.publication.title} />
      <Authors authors={data.publication.authors} />
      <JournalData data={journalData} />
      <SocialLinks title={data.publication.title} />
      <Abstract abstract={data.publication.abstract} />
      <FullTextLinks url={url} />
    </>
  )
}

export default PublicationDisplay
