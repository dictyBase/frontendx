import Typography from "@material-ui/core/Typography"
import PanelWrapper from "components/panels/PanelWrapper"
import Layout from "components/layout/Layout"
import GoaPanel from "./Panels/GoaPanel"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"

interface SummaryContainerProps {
  gene: GeneQuery
}

const SummaryContainer = ({ gene }: SummaryContainerProps) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/${geneId}/goannotations`}>
          <GoaPanel data={gene} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
