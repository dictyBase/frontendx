import React from "react"
import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { PublicationLoader } from "../components/PublicationLoader"
import { ErrorPage } from "../components/errors/ErrorPage"
import { NoPublicationIdErrorPage } from "../components/errors/NoPublicationIdErrorPage"
import { PublicationPage } from "../components/PublicationPage"

/**
 * Renders the publication page given a publication id
 */
const PublicationPageWrapper = () => {
  const { asPath } = useRouter()
  const id = asPath.slice(1)
  const { data, loading, error } = usePublicationQuery({
    variables: { id },
  })
  return (
    <>
      {match({ data, loading, error, id })
        .with({ id: "" }, () => <NoPublicationIdErrorPage />)
        .with(
          { data: { publication: P.select(P.not(undefined)) } },
          (publication) => (
            <PublicationPage publication={publication as Publication} />
          ),
        )
        .with({ loading: true }, () => <PublicationLoader />)
        .with({ error: P.not(undefined) }, () => <ErrorPage />)
        .otherwise(() => (
          <> This message should not appear </>
        ))}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default PublicationPageWrapper
