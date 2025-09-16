import { ReferencesContainer } from "../../../components/features/References/ReferencesContainer"
import { ErrorPageWrapper } from "../../../components/errors/ErrorPageWrapper"
import { Layout, TabValues } from "../../../components/layout/Layout"
import { NoDataDisplay } from "../../../components/NoDataDisplay"
import { Loader } from "../../../components/Loader"
import { useParams } from "react-router-dom"
import { useListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth-mui5"

/*
    Renders References given a gene id
*/
const ReferencesPageWrapper = () => {
  const { id } = useParams<{ id: string }>()
  const geneId = id as string
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
              listPublicationsWithGene: [],
            },
          },
          () => <NoDataDisplay query="References" geneId={geneId} />,
        )
        .with(
          {
            data: {
              listPublicationsWithGene: P.select(P.array({ id: P.string })),
            },
          },
          (publications) => <ReferencesContainer publications={publications} />,
        )
        .with({ loading: true }, () => <Loader />)
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
export default ReferencesPageWrapper
export const access = ACCESS.public