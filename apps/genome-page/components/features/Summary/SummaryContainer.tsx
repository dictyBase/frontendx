import Typography from "@material-ui/core/Typography"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { Layout } from "components/layout/Layout"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { GeneralInfoPanel } from "components/features/Summary/Panels/GeneralInfoPanel"
import { GoaPanel } from "components/features/Summary/Panels/GoaPanel"
import { ReferencesPanel } from "components/features/Summary/Panels/ReferencesPanel"

interface SummaryContainerProperties {
  geneSummary: GeneSummaryQuery
}

const SummaryContainer = ({ geneSummary }: SummaryContainerProperties) => {
  const { query } = useRouter()
  const {
    geneGeneralInformation,
    geneOntologyAnnotation,
    listPublicationsWithGene,
  } = geneSummary
  const publicationLimit = 5
  const partialPublicationsList = listPublicationsWithGene.slice(
    0,
    publicationLimit,
  )
  console.log(geneSummary)
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
        <PanelWrapper
          route={`${geneId}/goannotations`}
          title="Gene Ontology Annotations">
          <GoaPanel goas={geneOntologyAnnotation} />
        </PanelWrapper>
        <PanelWrapper
          route={`${geneId}/references`}
          title={`Publications (${publicationLimit} of ${listPublicationsWithGene.length}) `}>
          <ReferencesPanel publications={partialPublicationsList} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export { SummaryContainer }
