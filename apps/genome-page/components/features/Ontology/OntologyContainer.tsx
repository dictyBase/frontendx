import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import OntologyTabLayout from "./OntologyTabLayout"
/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */

interface OntologyContainerProperties {
  gene: GeneQuery
}
const OntologyContainer = ({ gene }: OntologyContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

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

export { OntologyContainer }
