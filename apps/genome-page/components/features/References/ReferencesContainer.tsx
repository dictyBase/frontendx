import Typography from "@material-ui/core/Typography"
import { Layout } from "components/layout/Layout"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { ReferencesDataTable } from "./ReferencesDataTable"

interface ReferencesContainerProperties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesContainer = ({
  publications,
}: ReferencesContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`References for ${geneId}`}
      description={`Gene references for ${geneId}`}>
      <Typography component="div">
        <ReferencesDataTable publications={publications} />
      </Typography>
    </Layout>
  )
}

export { ReferencesContainer }
