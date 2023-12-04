import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import PhenotypesDataTable from "./PhenotypesDataTable"
import { useRouter } from "next/router"

interface PhenotypesContainerProps {
  gene: GeneQuery
}
const PhenotypesContainer = ({ gene }: PhenotypesContainerProps) => {
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

export default PhenotypesContainer
