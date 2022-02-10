import SummaryContainer from "components/features/Summary/SummaryContainer"
import SummaryLoader from "components/features/Summary/SummaryLoader"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { query } = useRouter()
  const gene = query.gene as string

  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
      limit: 3,
      sort_by: "desc"
    },
    fetchPolicy: "cache-and-network",
  })
  return (
    <>
      {loading ? <SummaryLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <SummaryContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default GenomePageWrapper
