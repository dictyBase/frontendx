import { useRouter } from "next/router"
import { Layout } from "components/layout/Layout"
import { Loader } from "components/Loader"

/**
 * Loading screen for Summary page
 */
const SummaryLoader = () => {
  const { query } = useRouter()
  const geneId = query.id as string
  return (
    <Layout
      gene={geneId}
      title={`GO Annotations for ${geneId}`}
      description={`Gene Ontology Annotations for ${geneId}`}>
      <Loader />
    </Layout>
  )
}

export { SummaryLoader }
