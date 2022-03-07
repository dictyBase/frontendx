import Typography from "@material-ui/core/Typography"
import PanelWrapper from "components/panels/PanelWrapper"
import Layout from "components/layout/Layout"
import GoaPanel from "./Panels/GoaPanel"
import ReferencesPanel from "./Panels/ReferencesPanel"
import GeneralInfoPanel from "./Panels/GeneralInfoPanel"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import ProductInfoPanel from "./Panels/ProductInfoPanel"
import AssociatedSequencePanel from "./Panels/AssociatedSequencePanel"
import LinkPanel from "./Panels/LinksPanel"

interface SummaryContainerProps {
  gene: GeneQuery
}

const SummaryContainer = ({ gene }: SummaryContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string
  const referencesTitle = `Latest References (press references tab to view all ${gene.allPublications.num_pubs} papers)`

  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        <PanelWrapper title="General Information" route={`/gene/${geneId}/`}>
          <GeneralInfoPanel gene={gene} />
        </PanelWrapper>
        {gene.gene ? (
          <PanelWrapper
            title="Latest Gene Ontology Annotations"
            route={`/gene/${geneId}/goannotations`}>
            <GoaPanel data={gene} />
          </PanelWrapper>
        ) : (
          <></>
        )}
        {gene.listGeneProductInfo ? (
          <PanelWrapper
            title={"Gene Product Information"}
            route={`/gene/${geneId}/`}>
            <ProductInfoPanel gene={gene} />
          </PanelWrapper>
        ) : (
          <></>
        )}
        {gene.getAssociatedSequnces ? (
          <PanelWrapper
            title={"Associated Sequences"}
            route={`/gene/${geneId}/`}>
            <AssociatedSequencePanel data={gene} />
          </PanelWrapper>
        ) : (
          <></>
        )}
        {gene.getLinks ? (
          <PanelWrapper title={"Links"} route={`/gene/${geneId}/`}>
            <LinkPanel data={gene} />
          </PanelWrapper>
        ) : (
          <></>
        )}
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
