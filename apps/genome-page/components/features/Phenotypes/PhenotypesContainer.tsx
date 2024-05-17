import Typography from "@material-ui/core/Typography"
import { Layout } from "components/layout/Layout"
import { ListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { PhenotypesDataTable } from "./PhenotypesDataTable"

interface PhenotypesContainerProperties {
  strains: ListStrainsWithGeneQuery["listStrainsWithGene"]
}
const PhenotypesContainer = ({ strains }: PhenotypesContainerProperties) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Typography component="div">
        <PhenotypesDataTable strains={strains} />
      </Typography>
    </Layout>
  )
}

export { PhenotypesContainer }
