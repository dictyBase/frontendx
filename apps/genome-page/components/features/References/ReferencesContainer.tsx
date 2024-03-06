import Typography from "@material-ui/core/Typography"
import { Layout } from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { ReferencesDataTable } from "./ReferencesDataTable"

interface ReferencesContainerProperties {
  gene: GeneQuery
}

const ReferencesContainer = ({ gene }: ReferencesContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`References for ${geneId}`}
      description={`Gene references for ${geneId}`}>
      <Typography component="div">
        {" "}
        <ReferencesDataTable data={gene} />
      </Typography>
    </Layout>
  )
}

export { ReferencesContainer }
