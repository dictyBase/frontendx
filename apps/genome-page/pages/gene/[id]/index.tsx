import { SummaryContainer } from "components/features/Summary/SummaryContainer"
import { SummaryLoader } from "components/features/Summary/SummaryLoader"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { useRouter } from "next/router"
import { useGeneSummaryQuery } from "dicty-graphql-schema"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string

  const { loading, error, data } = useGeneSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })
  return (
    <>
      {loading ? <SummaryLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <SummaryContainer geneSummary={data} /> : <></>}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default GenomePageWrapper
