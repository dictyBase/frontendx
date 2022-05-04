import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import ReferencesDataTable from "./ReferencesDataTable"
import { useRouter } from "next/router"
interface ReferencesContainerProps {
  gene: GeneQuery
}

const ReferencesContainer = ({ gene }: ReferencesContainerProps) => {
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

export default ReferencesContainer
