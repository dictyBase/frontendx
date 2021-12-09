import React from "react"
import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import PublicationLoader from "src/features/Publication/PublicationLoader"
import ErrorPage from "components/errors/ErrorPage"
import PublicationContent from "components/PublicationContent"

const PublicationPage = () => {
  const { query } = useRouter()
  const id = query.id as string

  const { loading, error, data } = usePublicationQuery({
    variables: { id },
  })

  if (loading) return <PublicationLoader />
  if (error || !data) return <ErrorPage />

  const publication = data.publication as Publication
  const title = publication.title as string

  return <PublicationContent title={title} data={publication} />
}

export default PublicationPage
