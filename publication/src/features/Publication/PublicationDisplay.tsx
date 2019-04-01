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
    id: data.publication.id,
    doi: data.publication.doi,
    journal: data.publication.journal,
    pages: data.publication.pages,
    pub_date: data.publication.pub_date,
  }
  const url = `https://doi.org/${data.publication.doi}`

  return (
    <Fragment>
      <Title title={data.publication.title} />
      <Authors authors={data.publication.authors} />
      <JournalData data={journalData} />
      <SocialLinks title={data.publication.title} />
      <Abstract abstract={data.publication.abstract} />
      <FullTextLinks url={url} />
    </Fragment>
  )
}

export default PublicationDisplay
