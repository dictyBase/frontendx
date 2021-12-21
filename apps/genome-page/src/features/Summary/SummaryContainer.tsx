import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import PanelWrapper from "components/panels/PanelWrapper"
import SummaryLoader from "./SummaryLoader"
import Layout from "components/layout/Layout"
import GoaPanel from "features/Summary/Panels/GoaPanel"
import GraphQLErrorPage from "components/errors/GraphQLErrorPage"
import { useGeneQuery, GoAnnotation } from "dicty-graphql-schema"

/**
 * Container component that issues a GraphQL query to get gene data for the
 * summary page.
 */
const SummaryContainer = () => {
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
      title={`Gene Summary for ${gene}`}
      description={`Gene information for ${gene}`}>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/${gene}/goannotations`}>
          {loading && <SummaryLoader />}
          {error && <GraphQLErrorPage error={error} />}
          {data && <GoaPanel data={data.gene?.goas as GoAnnotation[]} />}
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
