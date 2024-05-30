import Typography from "@material-ui/core/Typography"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { Layout } from "components/layout/Layout"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { GeneralInfoPanel } from "components/features/Summary/Panels/GeneralInfoPanel"
import { GoaPanel } from "components/features/Summary/Panels/GoaPanel"
import { ProductInfoPanel } from "components/features/Summary/Panels/ProductInfoPanel"
import { AssociatedSequencePanel } from "components/features/Summary/Panels/AssociatedSequencePanel"

interface SummaryContainerProperties {
  geneSummary: GeneSummaryQuery
}

//    "listGeneProductInfo",
//    "getAssociatedSequnces",
//    "getLinks",
//    "allPublications",

const SummaryContainer = ({ geneSummary }: SummaryContainerProperties) => {
  const { query } = useRouter()
  const {
    geneGeneralInformation,
    geneOntologyAnnotation,
  } = geneSummary
  const geneId = query.id as string
  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        <PanelWrapper title="General Information">
          <GeneralInfoPanel generalInformation={geneGeneralInformation} />
        </PanelWrapper>
        <PanelWrapper title="Gene Ontology Annotations">
          <GoaPanel goas={geneOntologyAnnotation} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export { SummaryContainer }
