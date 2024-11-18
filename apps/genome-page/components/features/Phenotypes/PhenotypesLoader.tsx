import { useRouter } from "next/router"
import { Layout } from "components/layout/Layout"
import { Loader } from "components/Loader"

/**
 * Loading screen for Summary page
 */
const PhenotypesLoader = () => {
  const { query } = useRouter()
  const geneId = query.id as string
  return (
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Loader />
    </Layout>
  )
}

export { PhenotypesLoader }
