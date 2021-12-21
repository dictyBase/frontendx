import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import OntologyTabLayout from "./OntologyTabLayout"
import OntologyLoader from "./OntologyLoader"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import Layout from "components/layout/Layout"
import { useGeneQuery, GoAnnotation } from "dicty-graphql-schema"

/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */
const OntologyContainer = () => {
  let { gene } = useParams()
  if (!gene) gene = ""
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <OntologyLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  const geneName = data?.gene?.name as string
  const goas = data?.gene?.goas as GoAnnotation[]

  return (
    <Layout
      gene={geneName}
      title={`GO Annotations for ${geneName}`}
      description={`Gene Ontology Annotations for ${geneName}`}>
      <Typography component="div">
        <OntologyTabLayout data={goas} />
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
