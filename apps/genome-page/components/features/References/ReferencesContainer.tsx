import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import Layout from "components/layout/Layout"
import { useGeneQuery } from "dicty-graphql-schema"
import ReferencesLoader from "./ReferencesLoader"
import ReferencesDataTable from "./ReferencesDataTable"

const ReferencesContainer = () => {
  const gene = useParams().gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
  })

  return (
    <Layout
      gene={gene}
      title={`References for ${gene}`}
      description={`Gene references for ${gene}`}>
      <Typography component="div">
        {loading && <ReferencesLoader />}
        {error && <GraphQLErrorPage error={error} />}
        {data && <ReferencesDataTable data={data} />}
      </Typography>
    </Layout>
  )
}

export default ReferencesContainer
