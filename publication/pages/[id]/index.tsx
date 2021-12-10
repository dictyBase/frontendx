import React from "react"
import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import PublicationLoader from "components/PublicationLoader"
import ErrorPage from "components/errors/ErrorPage"
import PublicationPage from "components/PublicationPage"

/**
 * Renders the publication page given a publication id
 */
const PublicationPageWrapper = () => {
  const { query } = useRouter()
  const id = query.id as string

  const { loading, error, data } = usePublicationQuery({
    variables: { id },
  })

  return (
    <>
      {loading && <PublicationLoader />}
      {error && <ErrorPage />}
      {data && <PublicationPage data={data.publication as Publication} />}
    </>
  )
}

export default PublicationPageWrapper
