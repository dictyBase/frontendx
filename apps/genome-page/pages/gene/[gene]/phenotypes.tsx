import PhenotypesContainer from "components/features/Phenotypes/PhenotypesContainer"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import PhenotypesLoader from "components/features/Phenotypes/PhenotypesLoader"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
/*
    Renders the Phenotypes page given a gene id
*/
const PhenotypesPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
  })

  return (
    <>
      {loading ? <PhenotypesLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <PhenotypesContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default PhenotypesPageWrapper
