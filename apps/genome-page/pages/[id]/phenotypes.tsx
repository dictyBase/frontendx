import { ErrorPageWrapper } from "components/errors/ErrorPageWrapper"
import { PhenotypesContainer } from "components/features/Phenotypes/PhenotypesContainer"
import { Loader } from "components/Loader"
import { Layout, TabValues } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import { useListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { match, P } from "ts-pattern"
/*
    Renders the Phenotypes page given a gene id
*/
const PhenotypesPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useListStrainsWithGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })

  return (
    <Layout
      tabValue={TabValues.PHENOTYPES}
      gene={gene}
      title={`Phenotypes for ${gene}`}
      description={`Gene phenotypes for ${gene}`}>
      {match(result)
        .with(
          {
            data: {
              listStrainsWithGene: P.select(P.array({ id: P.string })),
            },
          },
          (strains) => <PhenotypesContainer strains={strains} />,
        )
        .with({ loading: true }, () => <Loader />)
        .with(
          {
            data: {
              listStrainsWithGene: P.union([], P.array({ phenotypes: [] })),
            },
          },
          () => <NoDataDisplay query="Phenotypes" geneId={gene} />,
        )
        .with({ error: P.select(P.not(undefined)) }, (error) => (
          <ErrorPageWrapper error={error} />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default PhenotypesPageWrapper
