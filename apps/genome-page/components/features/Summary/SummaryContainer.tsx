import Typography from "@material-ui/core/Typography"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { match } from "ts-pattern"
import { GeneralInfoPanel } from "components/features/Summary/Panels/GeneralInfoPanel"
import { GoaPanel } from "components/features/Summary/Panels/GoaPanel"
import { ReferencesPanel } from "components/features/Summary/Panels/ReferencesPanel"
import { NoDataDisplay } from "components/NoDataDisplay"

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
  const geneId = query.id as string
  return (
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
        title={`Publications (${partialPublicationsList.length} of ${listPublicationsWithGene.length}) `}>
        {match(partialPublicationsList)
          .with([], () => (
            <NoDataDisplay query="publications" geneId={geneId} />
          ))
          .otherwise((publications) => (
            <ReferencesPanel publications={publications} />
          ))}
      </PanelWrapper>
    </Typography>
  )
}

export { SummaryContainer }
