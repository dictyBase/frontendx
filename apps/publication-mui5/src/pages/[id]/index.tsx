import { useRouter } from "next/router"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { PublicationLoader } from "../../components/PublicationLoader"
import { ErrorPageWrapper } from "../../components/errors/ErrorPageWrapper"
import { PublicationPage } from "../../components/PublicationPage"

/**
 * Renders the publication page given a publication id
 */
const PublicationPageWrapper = () => {
  const { query } = useRouter()
  const id = query.id as string

  const result = usePublicationQuery({
    variables: { id },
  })

  return match(result)
    .with(
      {
        data: P.select(P.not(P.nullish)),
      },
      (data) => (
        <PublicationPage publication={data.publication as Publication} />
      ),
    )
    .with({ loading: true }, () => <PublicationLoader />)
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default PublicationPageWrapper
