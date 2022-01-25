import ReferencesContainer from "components/features/References/ReferencesContainer"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import ReferencesLoader from "components/features/References/ReferencesLoader"
import { useRouter } from "next/router"
import { useGeneQuery, GeneQuery } from "dicty-graphql-schema"

/*
    Renders References given a gene id
*/
const ReferencesPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
  })
  return (
    <>
      {loading ? <ReferencesLoader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <ReferencesContainer gene={data as GeneQuery} /> : <></>}
    </>
  )
}

export default ReferencesPageWrapper
