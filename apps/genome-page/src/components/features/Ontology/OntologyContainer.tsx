import Typography from "@material-ui/core/Typography"
import { GeneOntologyAnnotationQuery } from "dicty-graphql-schema"
import { OntologyTabLayout } from "./OntologyTabLayout"
/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */

interface OntologyContainerProperties {
  goas: NonNullable<GeneOntologyAnnotationQuery["geneOntologyAnnotation"]>
}
const OntologyContainer = ({ goas }: OntologyContainerProperties) => (
  <Typography component="div">
    <OntologyTabLayout goas={goas} />
  </Typography>
)

export { OntologyContainer }
