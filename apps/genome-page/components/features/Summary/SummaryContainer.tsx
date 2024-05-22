import Typography from "@material-ui/core/Typography"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { Layout } from "components/layout/Layout"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { GeneralInfoPanel } from "components/features/Summary/Panels/GeneralInfoPanel"

interface SummaryContainerProperties {
  geneSummary: GeneSummaryQuery
}

const SummaryContainer = ({ geneSummary }: SummaryContainerProperties) => {
  const { query } = useRouter()
  const { geneGeneralInformation } = geneSummary
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
      </Typography>
    </Layout>
  )
}

export { SummaryContainer }
