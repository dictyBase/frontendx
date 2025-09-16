import { useParams } from "react-router-dom"
import { ACCESS } from "@dictybase/auth-mui5"
import { SummaryContainer } from "components/features/Summary/SummaryContainer"
import { Layout, TabValues } from "components/layout/Layout"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { id } = useParams<{ id: string }>()
  const gene = id as string
  return (
    <Layout
      tabValue={TabValues.SUMMARY}
      gene={gene}
      title={`Gene Summary for ${gene}`}
      description={`Gene information for ${gene}`}>
      <SummaryContainer />
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default GenomePageWrapper
export const access = ACCESS.public
