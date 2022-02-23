import Typography from "@material-ui/core/Typography"
import PanelWrapper from "components/panels/PanelWrapper"
import Layout from "components/layout/Layout"
import GoaPanel from "./Panels/GoaPanel"
import ReferencesPanel from './Panels/ReferencesPanel'
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import ProductInfoPanel from "./Panels/ProductInfoPanel"

interface SummaryContainerProps {
  gene: GeneQuery,
}

const SummaryContainer = ({ gene }: SummaryContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string
  const referencesTitle = `Latest References (press references tab to view all ${gene.allPublications.num_pubs} papers)`
  console.log(gene)
  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/gene/${geneId}/goannotations`}>
          <GoaPanel data={gene} />
        </PanelWrapper>
        <PanelWrapper
          title={"Gene Product Information"}
          route={`/gene/${geneId}/`}>
          <ProductInfoPanel gene={gene} />
        </PanelWrapper>
        <PanelWrapper
          title={referencesTitle}
          route={`/gene/${geneId}/references`}>
          <ReferencesPanel gene={gene} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
