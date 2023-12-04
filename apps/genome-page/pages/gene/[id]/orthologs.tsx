import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import OrthologsLoader from "components/features/Orthologs/OrthologsLoader"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"
import OrthologsContainer from "components/features/Orthologs/OrthologsContainer"

/*
    Renders the Orthologs page given a gene id
*/
const OrthologsPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string

  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })

  return (
    <>
      {loading ? <OrthologsLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <OrthologsContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default OrthologsPageWrapper
