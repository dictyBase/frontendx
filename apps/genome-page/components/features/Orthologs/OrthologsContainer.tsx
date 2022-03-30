import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import OrthologsDataTable from "./OrthologsDataTable"
import { useRouter } from "next/router"

interface OrthologsContainerProps {
  gene: GeneQuery
}
const OrthologsContainer = ({ gene }: OrthologsContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string

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

export default OrthologsContainer
