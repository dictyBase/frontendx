import React, { Fragment } from "react"
import Title from "./Sections/Title"
import Authors from "./Sections/Authors"
import JournalData from "./Sections/JournalData"
import SocialLinks from "./Sections/SocialLinks"
import Abstract from "./Sections/Abstract"
import FullTextLinks from "./Sections/FullTextLinks"
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
