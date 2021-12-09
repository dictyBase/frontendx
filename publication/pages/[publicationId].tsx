import React from "react"
import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import ErrorPage from "src/common/components/ErrorPage"
import PublicationContent from "components/PublicationContent"
import PublicationLoader from "src/features/Publication/PublicationLoader"

function PublicationPage() {
  const { query } = useRouter()
  const id = query.publicationId as string

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
