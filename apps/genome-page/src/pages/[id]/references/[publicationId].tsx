import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst } from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { useParams } from "react-router-dom"
import { useListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth-mui5"
import { RelatedGenesContainer } from "components/features/References/RelatedGenesContainer"
import { ErrorPageWrapper } from "components/errors/ErrorPageWrapper"
import { Layout, TabValues } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import { Loader } from "components/Loader"

/*
    Displays a page showing all genes related to a specific publication
    for a given gene ID. Fetches publication data and renders the
    RelatedGenesContainer component when data is available.
*/
const RelatedGenesWrapper = () => {
  const { id, publicationId } = useParams<{
    id: string
    publicationId: string
  }>()
  const geneId = id as string
  const publicationIdParameter = publicationId as string
  const result = useListPublicationsWithGeneQuery({
    variables: {
      gene: geneId,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })
  return (
    <Layout
      tabValue={TabValues.REFERENCES}
      gene={geneId}
      title={`References for ${geneId}`}
      description={`Gene references for ${geneId}`}>
      {match(result)
        .with(
          {
            data: {
              listPublicationsWithGene: P.select(P.array({ id: P.string })),
            },
          },
          (publications) =>
            pipe(
              publications,
              AfindFirst(
                (publication) => publication.id === publicationIdParameter,
              ),
              Omatch(
                () => <></>,
                (p) => <RelatedGenesContainer publication={p} />,
              ),
            ),
        )
        .with({ loading: true }, () => <Loader />)
        .with(
          {
            data: {
              listPublicationsWithGene: [],
            },
          },
          () => <NoDataDisplay query="References" geneId={geneId} />,
        )
        .with({ error: P.select(P.not(P.nullish)) }, (error) => (
          <ErrorPageWrapper error={error} />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default RelatedGenesWrapper
export const access = ACCESS.public
