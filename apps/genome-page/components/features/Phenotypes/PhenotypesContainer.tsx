import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import PhenotypesDataTable from "./PhenotypesDataTable"

interface PhenotypesContainerProperties {
  gene: GeneQuery
}
const PhenotypesContainer = ({ gene }: PhenotypesContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Typography component="div">
        <PhenotypesDataTable data={gene} />
      </Typography>
    </Layout>
  )
}

export { PhenotypesContainer }
