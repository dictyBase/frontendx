import { SummaryContainer } from "components/features/Summary/SummaryContainer"
import { Layout, TabValues } from "components/layout/Layout"
import { useRouter } from "next/router"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
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
