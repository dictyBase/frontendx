import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import ProteinInfoLoader from "components/features/ProteinInformation/ProteinInfoLoader"
import ProteinInfoContainer from "components/features/ProteinInformation/ProteinInfoContainer"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"

/*
    Renders the Protein Information page given a gene id
*/
const ProteinInformationPageWrapper = () => {
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
      {loading ? <ProteinInfoLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <ProteinInfoContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default ProteinInformationPageWrapper
