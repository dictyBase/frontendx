import Typography from "@material-ui/core/Typography"
import OntologyTabLayout from "./OntologyTabLayout"
import OntologyLoader from "./OntologyLoader"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */

interface OntologyContainerProps {
  gene: GeneQuery
}
const OntologyContainer = ({ gene }: OntologyContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string

  return (
    <Layout
      gene={geneId}
      title={`GO Annotations for ${geneId}`}
      description={`Gene Ontology Annotations for ${geneId}`}>
      <Typography component="div">
        <OntologyTabLayout data={gene} />{" "}
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
