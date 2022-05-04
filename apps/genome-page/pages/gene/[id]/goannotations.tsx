import OntologyContainer from "components/features/Ontology/OntologyContainer"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import OntologyLoader from "components/features/Ontology/OntologyLoader"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"

/*
    Renders the Ontology page given a gene id
*/
const OntologyPageWrapper = () => {
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
      {loading ? <OntologyLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <OntologyContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default OntologyPageWrapper
