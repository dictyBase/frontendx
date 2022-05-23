import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import useStyles from "../../../styles/blastContainerStyles"
import { Paper, Container } from "@material-ui/core"
import QueryOrGeneRow from "./Sections/QueryOrGeneRow"

interface BlastContainerProps {
  gene: GeneQuery
}
const BlastContainer = ({ gene }: BlastContainerProps) => {
  const classes = useStyles()
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Container component={Paper} className={classes.root} maxWidth={false}>
        <Container maxWidth="lg">
          <QueryOrGeneRow />
        </Container>
      </Container>
    </Layout>
  )
}

export default BlastContainer
