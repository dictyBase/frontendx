import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst } from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { RelatedGenesContainer } from "components/features/References/RelatedGenesContainer"
import { GraphQLErrorPage } from "@dictybase/ui-common"
import { Layout, TabValues } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import { Loader } from "components/Loader"
import { useRouter } from "next/router"
import { useListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"

/*
    Renders the related genes of a publication associated with a given gene id
*/
const RelatedGenesWrapper = () => {
  const { query } = useRouter()
  const geneId = query.id as string
  const publicationId = query.publicationId as string
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
              AfindFirst((publication) => publication.id === publicationId),
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
        .with({ error: P.select(P.not(undefined)) }, (error) => (
          <GraphQLErrorPage error={error} />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default RelatedGenesWrapper
