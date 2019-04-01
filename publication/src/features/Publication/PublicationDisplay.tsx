import React, { Fragment } from "react"
import Title from "./Title"
import Authors from "./Authors"
import JournalData from "./JournalData"
import SocialLinks from "./SocialLinks"
import Abstract from "./Abstract"
import FullTextLinks from "./FullTextLinks"
import { Publication } from "./PublicationContainer"

interface Props extends Publication {}

export const PublicationDisplay = (props: Props) => {
  const { data } = props
  const journalData = {
    doi: data.publication.doi,
    full_text_url: data.publication.full_text_url,
    journal: data.publication.journal,
    page: data.publication.page,
    publication_date: data.publication.publication_date,
    pubmed: data.publication.pubmed,
    pubmed_url: data.publication.pubmed_url,
  }

  return (
    <Fragment>
      <Title title={data.publication.title} />
      <Authors authors={data.publication.authors} />
      <JournalData data={journalData} />
      <SocialLinks title={data.publication.title} />
      <Abstract abstract={data.publication.abstract} />
      <FullTextLinks url={data.publication.full_text_url} />
    </Fragment>
  )
}

export default PublicationDisplay
