import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import useStyles from "styles/blastContainerStyles"
import { Paper, Container, Grid } from "@material-ui/core"
import QuerySection from "./Sections/QuerySection"
import GeneOrID from "./Sections/GeneOrID"
import Or from "./Sections/Or"
import BlastProgramRow from "./Sections/BlastProgramRow"
import BlastDatabaseRow from "./Sections/BlastDatabaseRow"
import BlastButtonsRow from "./Sections/BlastButtonsRow"
import BlastOptionsRow from "./Sections/BlastOptionsRow"

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
        <Grid container spacing={2}>
          <QuerySection />
          <Or />
          <GeneOrID />
          <BlastProgramRow />
          <BlastDatabaseRow />
          <BlastButtonsRow />
          <BlastOptionsRow />
        </Grid>
      </Container>
    </Layout>
  )
}

export default BlastContainer
