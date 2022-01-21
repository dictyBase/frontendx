import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import Layout from "components/layout/Layout"
import { useGeneQuery } from "dicty-graphql-schema"
import PhenotypesLoader from "./PhenotypesLoader"
import PhenotypesDataTable from "./PhenotypesDataTable"

const PhenotypesContainer = () => {
  const gene = useParams().gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
  })

  return (
    <Layout
      gene={gene}
      title={`Phenotypes for ${gene}`}
      description={`Gene phenotypes for ${gene}`}>
      <Typography component="div">
        {loading && <PhenotypesLoader />}
        {error && <GraphQLErrorPage error={error} />}
        {data && <PhenotypesDataTable data={data} />}
      </Typography>
    </Layout>
  )
}

export default PhenotypesContainer
