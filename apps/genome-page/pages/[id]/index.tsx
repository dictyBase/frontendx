import { SummaryContainer } from "components/features/Summary/SummaryContainer"
import { Loader } from "components/Loader"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { Layout } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import { useRouter } from "next/router"
import { useGeneSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useGeneSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })
  return (
    <Layout
      gene={gene}
      title={`Gene Summary for ${gene}`}
      description={`Gene information for ${gene}`}
    >
      {match(result)
        .with(
          {
            data: P.nullish,
          },
          () => <NoDataDisplay query="Gene Summary" geneId={gene} />,
        )
        .with(
          {
            data: P.select(P.not(P.nullish)),
          },
          (data) => <SummaryContainer geneSummary={data} />,
        )
        .with({ loading: true }, () => <Loader />)
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
export default GenomePageWrapper
