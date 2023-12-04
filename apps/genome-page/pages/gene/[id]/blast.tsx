import BlastContainer from "components/features/Blast/BlastContainer"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import BlastLoader from "components/features/Blast/BlastLoader"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"

/*
    Renders the Blast page given a gene id
*/
const BlastPageWrapper = () => {
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
      {loading ? <BlastLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <BlastContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default BlastPageWrapper
