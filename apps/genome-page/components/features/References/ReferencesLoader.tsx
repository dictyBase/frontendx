import { useRouter } from "next/router"
import { Layout } from "components/layout/Layout"
import { Loader } from "components/Loader"

/**
 * Loading screen for Summary page
 */
const ReferencesLoader = () => {
  const { query } = useRouter()
  const geneId = query.id as string
  return (
    <Layout
      gene={geneId}
      title={`References for ${geneId}`}
      description={`Gene references for ${geneId}`}>
      <Loader />
    </Layout>
  )
}

export { ReferencesLoader }
