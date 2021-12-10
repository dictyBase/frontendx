import React from "react"
import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import PublicationLoader from "src/features/Publication/PublicationLoader"
import ErrorPage from "components/errors/ErrorPage"
import PublicationContent from "components/PublicationContent"

/**
 * Renders the publication page given a publication id
 */
const PublicationPage = () => {
  const { query } = useRouter()
  const id = query.id as string

  const { loading, error, data } = usePublicationQuery({
    variables: { id },
  })

  return (
    <>
      {loading && <PublicationLoader />}
      {error && <ErrorPage />}
      {data && <PublicationContent data={data.publication as Publication} />}
    </>
  )
}

export default PublicationPage
