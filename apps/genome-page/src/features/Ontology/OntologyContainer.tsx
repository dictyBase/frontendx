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
  const gene = useParams().gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })

  return (
    <Layout
      gene={gene}
      title={`GO Annotations for ${gene}`}
      description={`Gene Ontology Annotations for ${gene}`}>
      <Typography component="div">
        {loading && <OntologyLoader />}
        {error && <GraphQLErrorPage error={error} />}
        {data && <OntologyTabLayout data={data.gene?.goas as GoAnnotation[]} />}
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
