import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import OrthologsDataTable from "./OrthologsDataTable"

interface OrthologsContainerProperties {
  gene: GeneQuery
}
const OrthologsContainer = ({ gene }: OrthologsContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Orthologs for ${geneId}`}
      description={`Gene Orthologs for ${geneId}`}>
      <Typography component="div">
        <OrthologsDataTable data={gene} />
      </Typography>
    </Layout>
  )
}

export { OrthologsContainer }
